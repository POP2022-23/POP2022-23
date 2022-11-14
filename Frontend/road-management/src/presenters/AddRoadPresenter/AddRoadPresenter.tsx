import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoadDataDTO } from "../../interfaces/map/mapInterfaces";
import { MapModel } from "../../models/MapModel";
import AddRoadView from "../../views/AddRoadView/AddRoadView";
import AddRoadValidator from "./AddRoadValidator";

function AddRoadPresenter() {
  const navigate = useNavigate();
  const [road, setRoad] = useState<RoadDataDTO | null>();
  const [valid, setValid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onChanged = (road: RoadDataDTO) => {
    var validationError = AddRoadValidator(road);

    setRoad(road);
    setError(validationError);
    setValid(validationError == null);
  };

  const onSubmit = async () => {
    if (valid) {
      const model = new MapModel();

      const result = await model.addRoad(road!);

      if (result) {
        navigate("/map?message=Droga została dodana");
      } else {
        setError("Coś poszło nie tak, spróbuj ponownie później");
      }
    }
  };

  const onCancel = function () {
    navigate("/map");
  };

  return (
    <AddRoadView
      valid={valid}
      errorMessage={error}
      onCancel={onCancel}
      onChanged={onChanged}
      onSubmit={onSubmit}
    />
  );
}

export default AddRoadPresenter;
