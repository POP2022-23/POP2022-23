import React from "react";
import "./paidFees.css";
import {FeesDTO} from "../../interfaces/fees/feesinterfaces";
import {Button, Container} from "react-bootstrap";
import FeeListTable from "./FeeListTable";

interface IPaidFeesListWindow {
  feesList: Array<FeesDTO>;
  onReturnClicked: () => void;
  onViewDetailsClicked: (feeId: number) => void;
}

function PaidFeesListWindow({feesList, onReturnClicked, onViewDetailsClicked}: IPaidFeesListWindow) {
  return (
    <Container className="paid-fees-container">
      <h1 className="paid-fees-title">Opłacone opłaty</h1>
      <FeeListTable feesList={feesList} onViewDetailsClicked={onViewDetailsClicked}/>
      <Container>
        <Button onClick={onReturnClicked}>Wróć do menu</Button>
      </Container>
    </Container>
  )
}

export default PaidFeesListWindow;