import React from "react";
import "./unpaidFees.css";
import { FeesDTO } from "../../interfaces/fees/feesinterfaces";
import { Button, Container } from "react-bootstrap";
import UnpaidFeeListTable from "./UnpaidFeeListTable";

interface IUnpaidFeesListWindow {
  feesList: Array<FeesDTO>;
  onReturnClicked: () => void;
  onViewUnpaidFeeDetailsClicked: (feeId: number) => void;
}

function UnpaidFeesListWindow({
  feesList,
  onReturnClicked,
  onViewUnpaidFeeDetailsClicked,
}: IUnpaidFeesListWindow) {
  return (
    <Container className="paid-fees-container">
      <h1 className="paid-fees-title">Nieopłacone opłaty</h1>
      <UnpaidFeeListTable
        feesList={feesList}
        onViewUnpaidFeeDetailsClicked={onViewUnpaidFeeDetailsClicked}
      />
      <Container>
        <Button onClick={onReturnClicked}>Wróć do menu</Button>
      </Container>
    </Container>
  );
}

export default UnpaidFeesListWindow;
