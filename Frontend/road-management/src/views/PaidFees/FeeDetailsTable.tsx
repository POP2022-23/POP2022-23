import React from 'react'
import {FeesDTO} from "../../interfaces/fees/feesinterfaces";
import FeeDetailsTableRow from "./FeeDetailsTableRow";

interface IFeeDetailsTable {
    feeDetails: FeesDTO | undefined;
}

function FeeDetailsTable({feeDetails}: IFeeDetailsTable) {
    return feeDetails === undefined ? <p>Brak danych dla tej opłaty</p> :
        (
            <table className="paid-fees-details-table">
                <tbody>
                <FeeDetailsTableRow label="Kwota:" value={`${feeDetails.amount} zł`}/>
                <FeeDetailsTableRow label="Data wystawienia:" value={feeDetails.issueDate.split('T')[0]}/>
                <FeeDetailsTableRow label="Data opłacenia:" value={feeDetails.expirationDate.split('T')[0]}/>
                <FeeDetailsTableRow label="Opis:" value={feeDetails.description}/>
                </tbody>
            </table>
        )
}

export default FeeDetailsTable;