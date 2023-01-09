import React from "react";
import { VehicleType } from "../../interfaces/fees/feesinterfaces";
import { VehicleTypeStrings } from "../../utils/enumExtensions";
import { Button } from "react-bootstrap";

interface IProps {
  feeId: number;
  issueDate: string;
  tariffName: string;
  vehicleType: VehicleType;
  onMakePaymentClicked: (feeId: number) => void;
}

function UnpaidFeeListTableRow({
  feeId,
  issueDate,
  tariffName,
  vehicleType,
  onMakePaymentClicked,
}: IProps) {
  return (
    <tr>
      <td>{issueDate.split("T")[0]}</td>
      <td>{tariffName}</td>
      <td>{VehicleTypeStrings[vehicleType]}</td>
      <td>
        <Button onClick={() => onMakePaymentClicked(feeId)}>Opłać</Button>
      </td>
    </tr>
  );
}

export default UnpaidFeeListTableRow;
