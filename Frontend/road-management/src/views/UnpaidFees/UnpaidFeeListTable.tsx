import React from "react";
import { FeesDTO } from "../../interfaces/fees/feesinterfaces";
import UnpaidFeeListTableRow from "./UnpaidFeeListTableRow";

interface IFeeListTable {
  feesList: Array<FeesDTO>;
  onViewUnpaidFeeDetailsClicked: (feeId: number) => void;
}

function UnpaidFeeListTable({
  feesList,
  onViewUnpaidFeeDetailsClicked,
}: IFeeListTable) {
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
              onViewUnpaidFeeDetailsClicked={onViewUnpaidFeeDetailsClicked}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default UnpaidFeeListTable;
