import React, {useEffect, useState} from "react";
import PaidFeesListWindow from "../../views/PaidFees/PaidFeesListWindow";
import {FeesModelProxy} from "../../models/FeesModelProxy";
import {FeesDTO} from "../../interfaces/fees/feesinterfaces";
import {useNavigate} from "react-router-dom";
import PaidFeeDetailsWindow from "../../views/PaidFees/PaidFeeDetailsWindow";

export enum Action {
  PaidFees,
  UnpaidFees
}

interface IFeesPresenter {
  action: Action;
}

function FeesPresenter({action}: IFeesPresenter) {
  const navigate = useNavigate();
  const [feesList, setFeesList] = useState<FeesDTO[]>(new Array<FeesDTO>());
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
      // Fetching unpaid fees list from feesModel
    }

    switch (action) {
      case Action.PaidFees:
        fetchPaidFeesList();
        break;
      case Action.UnpaidFees:
        fetchUnpaidFeesList()
    }

  }, []);

  function onReturnToMainMenuClicked() {
    navigate("/fees");
  }

  function onViewPaidFeeDetailsClicked(feeId: number) {
    setSelectedFeeId(feeId);
  }

  function onReturnToPaidFeeListClicked() {
    setSelectedFeeId(undefined);
  }

  function openPaidFeesListWindow(): JSX.Element {
    return <PaidFeesListWindow feesList={feesList} onReturnClicked={onReturnToMainMenuClicked}
                               onViewDetailsClicked={onViewPaidFeeDetailsClicked}/>;
  }

  function openPaidFeeDetailsWindow(feeId: number): JSX.Element {
    return <PaidFeeDetailsWindow feeId={feeId} onReturnClicked={onReturnToPaidFeeListClicked}/>
  }

  function render(selectedAction: Action): JSX.Element {
    switch (selectedAction) {
      case Action.PaidFees: {
        return (
          selectedFeeId !== undefined ? openPaidFeeDetailsWindow(selectedFeeId) : openPaidFeesListWindow()
        )
      }

      case Action.UnpaidFees:
        return <h1>Nie zaimplementowano</h1>
    }
  }

  return render(action)
}

export default FeesPresenter;