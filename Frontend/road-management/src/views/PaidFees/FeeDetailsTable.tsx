import React from 'react'
import {FeesDTO, VehicleType} from "../../interfaces/fees/feesinterfaces";
import FeeDetailsTableRow from "./FeeDetailsTableRow";
import {VehicleTypeStrings} from "../../utils/enumExtensions";

interface IFeeDetailsTable {
  feeDetails: FeesDTO | undefined;
}

function FeeDetailsTable({feeDetails}: IFeeDetailsTable) {
  return feeDetails === undefined ? <p>Brak danych dla tej opłaty</p> :
    (
      <table className="paid-fees-details-table">
        <tbody>
        <FeeDetailsTableRow label="Kwota" value={`${feeDetails.amount} zł`}/>
        <FeeDetailsTableRow label="Data" value={feeDetails.date.toISOString().split('T')[0]}/>
        <FeeDetailsTableRow label="Taryfa" value={feeDetails.tariff.name}/>
        <FeeDetailsTableRow label="Typ pojazdu" value={VehicleTypeStrings[VehicleType[feeDetails.vehicleType]]}/>
        </tbody>
      </table>
    )
}

export default FeeDetailsTable;