import React from "react";
import { FeesDetailsDTO } from "../../interfaces/fees/feesinterfaces";
import UnpaidFeeDetailsTableRow from "./UnpaidFeeDetailsTableRow";

interface IFeeDetailsTable {
  feeDetails: FeesDetailsDTO | undefined;
}

function UnpaidFeeDetailsTable({ feeDetails }: IFeeDetailsTable) {
  return feeDetails === undefined ? (
    <p>Brak danych dla tej opłaty</p>
  ) : (
    <table className="paid-fees-details-table">
      <tbody>
        <UnpaidFeeDetailsTableRow
          label="Imię:"
          value={feeDetails.driverData.firstName}
        />
        <UnpaidFeeDetailsTableRow
          label="Nazwisko:"
          value={feeDetails.driverData.lastName}
        />
        <UnpaidFeeDetailsTableRow
          label="E-mail:"
          value={feeDetails.driverData.email}
        />
        <UnpaidFeeDetailsTableRow
          label="Telefon::"
          value={feeDetails.driverData.phoneNumber}
        />
        <UnpaidFeeDetailsTableRow
          label="Kwota:"
          value={`${feeDetails.amount} zł`}
        />
        <UnpaidFeeDetailsTableRow
          label="Opis:"
          value={feeDetails.description}
        />
        <UnpaidFeeDetailsTableRow
          label="Data wystawienia:"
          value={feeDetails.issueDate.split("T")[0]}
        />
        <UnpaidFeeDetailsTableRow
          label="Data opłacenia:"
          value={feeDetails.expirationDate.split("T")[0]}
        />
      </tbody>
    </table>
  );
}

export default UnpaidFeeDetailsTable;
