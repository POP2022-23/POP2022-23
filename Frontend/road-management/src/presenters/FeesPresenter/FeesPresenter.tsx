import React, { useEffect, useState } from "react";
import PaidFeesListWindow from "../../views/PaidFees/PaidFeesListWindow";
import { FeesModelProxy } from "../../models/FeesModelProxy";
import { FeesDTO } from "../../interfaces/fees/feesinterfaces";
import { useNavigate } from "react-router-dom";
import PaidFeeDetailsWindow from "../../views/PaidFees/PaidFeeDetailsWindow";
import UnpaidFeesListWindow from "../../views/UnpaidFees/UnpaidFeesListWindow";

export enum Action {
  PaidFees,
  UnpaidFees,
}

interface IFeesPresenter {
  action: Action;
}

function FeesPresenter({ action }: IFeesPresenter) {
  const navigate = useNavigate();
  const [feesList, setFeesList] = useState<FeesDTO[]>(new Array<FeesDTO>());
  const [unpaidFees, setUnpaidFees] = useState<FeesDTO[]>(new Array<FeesDTO>());
  const [selectedFeeId, setSelectedFeeId] = useState<number | undefined>();

  useEffect(() => {
    const feesModel = new FeesModelProxy();

    async function fetchPaidFeesList() {
      const response = await feesModel.getPaidFeesList("1");
      if (response !== null) {
        setFeesList(response);
      }
    }

    async function fetchUnpaidFeesList() {
      const response = await feesModel.getUnpaidFeesList("1");
      if (response !== null) {
        setUnpaidFees(response);
      }
    }

    switch (action) {
      case Action.PaidFees:
        fetchPaidFeesList();
        break;
      case Action.UnpaidFees:
        fetchUnpaidFeesList();
    }
  }, []);

  function onReturnToMainMenuClicked() {
    navigate("/fees");
  }

  function onViewPaidFeeDetailsClicked(feeId: number) {
    setSelectedFeeId(feeId);
  }

  function onMakePaymentClicked(feeId: number) {
    setSelectedFeeId(feeId);
  }

  function onReturnToPaidFeeListClicked() {
    setSelectedFeeId(undefined);
  }

  function openPaidFeesListWindow(): JSX.Element {
    return (
      <PaidFeesListWindow
        feesList={feesList}
        onReturnClicked={onReturnToMainMenuClicked}
        onViewDetailsClicked={onViewPaidFeeDetailsClicked}
      />
    );
  }

  function openPaidFeeDetailsWindow(feeId: number): JSX.Element {
    return (
      <PaidFeeDetailsWindow
        feeId={feeId}
        onReturnClicked={onReturnToPaidFeeListClicked}
      />
    );
  }

  function openUnpaidFeesListWindow(): JSX.Element {
    return (
      <UnpaidFeesListWindow
        feesList={unpaidFees}
        onReturnClicked={onReturnToMainMenuClicked}
        onMakePaymentClicked={onMakePaymentClicked}
      />
    );
  }

  function openMakePaymentWindow(feeId: number): JSX.Element {
    return <h1>Do zaimplementowania w sprincie 4</h1>;
  }

  function render(selectedAction: Action): JSX.Element {
    switch (selectedAction) {
      case Action.PaidFees: {
        return selectedFeeId !== undefined
          ? openPaidFeeDetailsWindow(selectedFeeId)
          : openPaidFeesListWindow();
      }

      case Action.UnpaidFees:
        return selectedFeeId !== undefined
          ? openMakePaymentWindow(selectedFeeId)
          : openUnpaidFeesListWindow();
    }
  }

  return render(action);
}

export default FeesPresenter;
