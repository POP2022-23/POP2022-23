import React from 'react'
import {FeesDetailsDTO} from "../../interfaces/fees/feesinterfaces";
import FeeDetailsTableRow from "./FeeDetailsTableRow";

interface IFeeDetailsTable {
    feeDetails: FeesDetailsDTO | undefined;
}

function FeeDetailsTable({feeDetails}: IFeeDetailsTable) {
    return feeDetails === undefined ? <p>Brak danych dla tej opłaty</p> :
        (
            <table className="paid-fees-details-table">
                <tbody>
                <FeeDetailsTableRow label="Imię:" value={feeDetails.driverData.firstName}/>
                <FeeDetailsTableRow label="Nazwisko:" value={feeDetails.driverData.lastName}/>
                <FeeDetailsTableRow label="E-mail:" value={feeDetails.driverData.email}/>
                <FeeDetailsTableRow label="Telefon::" value={feeDetails.driverData.phoneNumber}/>
                <FeeDetailsTableRow label="Kwota:" value={`${feeDetails.amount} zł`}/>
                <FeeDetailsTableRow label="Opis:" value={feeDetails.description}/>
                <FeeDetailsTableRow label="Data wystawienia:" value={feeDetails.issueDate.split('T')[0]}/>
                <FeeDetailsTableRow label="Data opłacenia:" value={feeDetails.expirationDate.split('T')[0]}/>
                </tbody>
            </table>
        )
}

export default FeeDetailsTable;