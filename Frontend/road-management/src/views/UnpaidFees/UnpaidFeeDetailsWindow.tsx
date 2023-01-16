import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { FeesDetailsDTO } from "../../interfaces/fees/feesinterfaces";
import { FeesModelProxy } from "../../models/FeesModelProxy";
import FeeDetailsTable from "../PaidFees/FeeDetailsTable";
import FeeDetailsTableRow from "../PaidFees/FeeDetailsTableRow";
interface IUnpaidFeeDetailsWindow {
  feeId: number;
  onReturnClicked: () => void;
  onMakePaymentClicked: (
    name: String,
    surname: String,
    email: String,
    phoneNumber: String,
    paymentType: String
  ) => void;
}

function UnpaidFeeDetailsWindow({
  feeId,
  onReturnClicked,
  onMakePaymentClicked,
}: IUnpaidFeeDetailsWindow) {
  const [feeDetails, setFeeDetails] = useState<FeesDetailsDTO | undefined>();

  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const [paymentType, setPaymentType] = useState<String | undefined>();

  const [error, setError] = useState<String | null>(null);

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

  const onMakePaymentClickedHandler = () => {
    if (
      nameRef.current!.value === "" ||
      surnameRef.current!.value === "" ||
      emailRef.current!.value === "" ||
      phoneNumberRef.current!.value === "" ||
      paymentType === undefined
    ) {
      setError("Wszystkie pola muszą być wypełnione");
      return;
    }

    onMakePaymentClicked(
      nameRef.current!.value,
      surnameRef.current!.value,
      emailRef.current!.value,
      phoneNumberRef.current!.value,
      paymentType!
    );
  };

  return (
    <Container className="paid-fees-container">
      <h1 className="paid-fees-title">Szczegóły opłaty</h1>
      {error ? <Alert variant={"danger"}>{error}</Alert> : null}
      {feeDetails === undefined ? (
        <p>Brak danych dla tej opłaty</p>
      ) : (
        <table className="paid-fees-details-table">
          <tbody>
            <FeeDetailsTableRow
              label="Kwota:"
              value={`${feeDetails!.amount} zł`}
            />
            <FeeDetailsTableRow label="Opis:" value={feeDetails!.description} />
            <FeeDetailsTableRow
              label="Data wystawienia:"
              value={feeDetails!.issueDate.split("T")[0]}
            />
            <FeeDetailsTableRow
              label="Data opłacenia:"
              value={feeDetails!.expirationDate.split("T")[0]}
            />
            <tr className="paid-fees-details-tr">
              <td>
                <label>Imię</label>
              </td>
              <td>
                <input ref={nameRef} />
              </td>
            </tr>
            <tr className="paid-fees-details-tr">
              <td>
                <label>Nazwisko</label>
              </td>
              <td>
                <input ref={surnameRef} />
              </td>
            </tr>
            <tr className="paid-fees-details-tr">
              <td>
                <label>Email</label>
              </td>
              <td>
                <input type="email" ref={emailRef} />
              </td>
            </tr>
            <tr className="paid-fees-details-tr">
              <td>
                <label>Numer telefonu</label>
              </td>
              <td>
                <input type="tel" ref={phoneNumberRef} />
              </td>
            </tr>
            <tr className="paid-fees-details-tr">
              <td>
                <label>Sposób płatności</label>
              </td>
              <input
                type="radio"
                id="html"
                value="blik"
                checked={paymentType === "blik"}
                onChange={() => setPaymentType("blik")}
              />
              <label>BLIK</label>
              <br />
              <input
                type="radio"
                id="css"
                value="transfer"
                checked={paymentType === "transfer"}
                onChange={() => setPaymentType("transfer")}
              />
              <label>Przelew</label>
              <br />
              <input
                type="radio"
                id="javascript"
                value="card"
                checked={paymentType === "card"}
                onChange={() => setPaymentType("card")}
              />
              <label>Karta</label>
            </tr>
          </tbody>
        </table>
      )}

      <Container>
        <Button onClick={onMakePaymentClickedHandler}>Zapłać</Button>
        <Button onClick={onReturnClicked}>Wróć do listy opłat</Button>
      </Container>
    </Container>
  );
}

export default UnpaidFeeDetailsWindow;
