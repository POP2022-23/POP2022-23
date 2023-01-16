import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FeesDetailsDTO } from "../../interfaces/fees/feesinterfaces";
import { FeesModelProxy } from "../../models/FeesModelProxy";
import FeeDetailsTable from "../PaidFees/FeeDetailsTable";
interface IUnpaidFeeDetailsWindow {
  feeId: number;
  onReturnClicked: () => void;
  onMakePaymentClicked: () => void;
}

function UnpaidFeeDetailsWindow({
  feeId,
  onReturnClicked,
  onMakePaymentClicked,
}: IUnpaidFeeDetailsWindow) {
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
      <FeeDetailsTable feeDetails={feeDetails} />
      <Container>
        <Button onClick={onMakePaymentClicked}>Opłać</Button>
        <Button onClick={onReturnClicked}>Wróć do listy opłat</Button>
      </Container>
    </Container>
  );
}

export default UnpaidFeeDetailsWindow;
