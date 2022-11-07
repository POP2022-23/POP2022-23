import { useState } from "react";
import { RoadDataDTO } from "../../interfaces/map/mapInterfaces";
import AddRoadView from "../../views/AddRoadView/AddRoadView";
import AddRoadValidator from "./AddRoadValidator";

function AddRoadPresenter() {
  const [error, setError] = useState<string | null>(null);

  const onAddRoad = (road: RoadDataDTO) => {
    var validationError = AddRoadValidator(road);

    setError(validationError);

    // TODO: Zapytanie do serwera
  };

  return <AddRoadView errorMessage={error} onAddRoad={onAddRoad} />;
}

export default AddRoadPresenter;
