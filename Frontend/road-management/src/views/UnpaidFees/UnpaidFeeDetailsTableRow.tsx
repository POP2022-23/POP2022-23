import React from "react";

interface IProps {
  label: string;
  value: string | number;
}

function UnpaidFeeDetailsTableRow({ label, value }: IProps) {
  return (
    <tr className="paid-fees-details-tr">
      <td>
        <label>{label}</label>
      </td>
      <td>{value}</td>
    </tr>
  );
}

export default UnpaidFeeDetailsTableRow;
