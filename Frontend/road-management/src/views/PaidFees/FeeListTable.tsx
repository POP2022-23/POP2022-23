import React from 'react'
import {FeesDTO} from "../../interfaces/fees/feesinterfaces";
import FeeListTableRow from "./FeeListTableRow";

interface IFeeListTable {
  feesList: Array<FeesDTO>
  onViewDetailsClicked: (feeId: number) => void;
}

function FeeListTable({feesList, onViewDetailsClicked}: IFeeListTable) {
  return (
    <table className="paid-fees-list-table">
      <thead>
      <tr>
        <th>Data wydania</th>
        <th>Nazwa taryfy</th>
        <th>Typ pojazdu</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      {feesList.map(fee => {
        return <FeeListTableRow key={fee.id} feeId={fee.id} issueDate={fee.issueDate} tariffName={fee.tariffName}
                                vehicleType={fee.vehicleType} onViewDetailsClicked={onViewDetailsClicked}/>
      })}
      </tbody>
    </table>
  )
}

export default FeeListTable;