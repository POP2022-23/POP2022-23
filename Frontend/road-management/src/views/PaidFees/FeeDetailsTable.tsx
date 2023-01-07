import React from 'react'
import {FeesDTO} from "../../interfaces/fees/feesinterfaces";
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
                <FeeDetailsTableRow label="Data wystawienia" value={feeDetails.issueDate.split('T')[0]}/>
                <FeeDetailsTableRow label="Data opłacenia" value={feeDetails.expirationDate.split('T')[0]}/>
                </tbody>
            </table>
        )
}

export default FeeDetailsTable;