import React from 'react'

interface IProps {
  label: string;
  value: string | number;
}

function FeeDetailsTableRow({label, value}: IProps) {
  return (
    <tr className="paid-fees-details-tr">
      <td>
        <label>{label}</label>
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

export default FeeDetailsTableRow