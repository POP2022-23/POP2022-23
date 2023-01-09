import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {FeesDetailsDTO} from "../../interfaces/fees/feesinterfaces";
import FeeDetailsTable from "./FeeDetailsTable";
import {FeesModelProxy} from "../../models/FeesModelProxy";
interface IPaidFeeDetailsWindow {
  feeId: number;
  onReturnClicked: () => void;
}

function PaidFeeDetailsWindow({feeId, onReturnClicked}: IPaidFeeDetailsWindow) {
  const [feeDetails, setFeeDetails] = useState<FeesDetailsDTO | undefined>();

  useEffect(() => {
    const feesModel = new FeesModelProxy();

    async function fetchPaidFeesList() {
      const response = await feesModel.getFeeDetails(feeId);
      if (response !== null) {
        setFeeDetails(response);
      }
    }
    
    fetchPaidFeesList();
    
  }, []);

  return (
    <Container className="paid-fees-container">
      <h1 className="paid-fees-title">Szczegóły opłaty</h1>
      <FeeDetailsTable feeDetails={feeDetails}/>
      <Container>
        <Button onClick={onReturnClicked}>Wróc do listy opłat</Button>
      </Container>
    </Container>)
}

export default PaidFeeDetailsWindow;