import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {FeesDTO, VehicleType} from "../../interfaces/fees/feesinterfaces";
import FeeDetailsTable from "./FeeDetailsTable";
interface IPaidFeeDetailsWindow {
  feeId: number;
  onReturnClicked: () => void;
}

function PaidFeeDetailsWindow({feeId, onReturnClicked}: IPaidFeeDetailsWindow) {
  const [feeDetails, setFeeDetails] = useState<FeesDTO | undefined>();

  useEffect(() => {
    // Fetching specific fee details;

    setFeeDetails({
      id: 1,
      vehicleType: VehicleType.PASSENGER_CAR,
      isPaid: true,
      amount: 100.00,
      date: new Date(2022, 12, 16),
      roadIds: [
        1, 2
      ],
      tariff: {
        id: 1,
        name: "Opłata za przejazd autostradą A1 oraz A4",
        isValid: true,
        roadIds: [1, 2],
        rates: new Map([["PASSENGER_CAR", 1], ["BUS", 2]])
      }
    })
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