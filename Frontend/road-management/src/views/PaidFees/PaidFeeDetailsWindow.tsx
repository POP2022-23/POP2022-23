import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {FeesDTO} from "../../interfaces/fees/feesinterfaces";
import FeeDetailsTable from "./FeeDetailsTable";
import {FeesModelProxy} from "../../models/FeesModelProxy";
interface IPaidFeeDetailsWindow {
  feeId: number;
  onReturnClicked: () => void;
}

function PaidFeeDetailsWindow({feeId, onReturnClicked}: IPaidFeeDetailsWindow) {
  const [feeDetails, setFeeDetails] = useState<FeesDTO | undefined>();

  useEffect(() => {
    // Fetching specific fee details;
    const feesModel = new FeesModelProxy();

    async function fetchPaidFeesList() {
      const response = await feesModel.getPaidFeesList("1");
      if (response !== null) {
        setFeeDetails(response.find(f => f.id == feeId));
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