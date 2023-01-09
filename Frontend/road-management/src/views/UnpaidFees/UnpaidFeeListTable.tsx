import React from "react";
import { FeesDTO } from "../../interfaces/fees/feesinterfaces";
import UnpaidFeeListTableRow from "./UnpaidFeeListTableRow";

interface IFeeListTable {
  feesList: Array<FeesDTO>;
  onMakePaymentClicked: (feeId: number) => void;
}

function UnpaidFeeListTable({ feesList, onMakePaymentClicked }: IFeeListTable) {
  return (
    <table className="paid-fees-list-table">
      <thead>
        <tr>
          <th>Data wydania</th>
          <th>Nazwa taryfy</th>
          <th>Typ pojazdu</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {feesList.map((fee) => {
          return (
            <UnpaidFeeListTableRow
              key={fee.id}
              feeId={fee.id}
              issueDate={fee.issueDate}
              tariffName={fee.tariffName}
              vehicleType={fee.vehicleType}
              onMakePaymentClicked={onMakePaymentClicked}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default UnpaidFeeListTable;
