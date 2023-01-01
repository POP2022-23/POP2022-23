import React from 'react'
import {VehicleType} from "../../interfaces/fees/feesinterfaces";
import {VehicleTypeStrings} from "../../utils/enumExtensions";
import {Button} from "react-bootstrap";

interface IProps {
  feeId: number;
  date: Date;
  tariffName: string;
  vehicleType: VehicleType;
  onViewDetailsClicked: (feeId: number) => void;
}

function FeeListTableRow({feeId, date, tariffName, vehicleType, onViewDetailsClicked}: IProps) {
  return (
    <tr>
      <td>{date.toISOString().split('T')[0]}</td>
      <td>{tariffName}</td>
      <td>{VehicleTypeStrings[VehicleType[vehicleType]]}</td>
      <td>
        <Button onClick={() => onViewDetailsClicked(feeId)}>Zobacz szczegóły</Button>
      </td>
    </tr>
  )
}

export default FeeListTableRow