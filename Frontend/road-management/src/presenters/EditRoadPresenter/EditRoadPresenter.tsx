import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoadDataDTO } from "../../interfaces/map/mapInterfaces";
import { MapModelProxy } from "../../models/MapModelProxy";
import EditRoadView from "../../views/EditRoadView/EditRoadView";
import EditRoadValidator from "./EditRoadValidator";

function EditRoadPresenter() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [road, setRoad] = useState<RoadDataDTO | null>();
  const [valid, setValid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // fetch from API
    const proxy = new MapModelProxy();

    async function fetchFromApi() {
      const roads = await proxy.getRoadList();

      setRoad(roads.find((road) => road.id?.toString() === id));
    }

    fetchFromApi();
  }, [id]);

  const onInputFieldChanged = (road: RoadDataDTO) => {
    var validationError = EditRoadValidator(road);

    setRoad(road);
    setError(validationError);
    setValid(validationError == null);
  };

  const onSaveRoadClicked = async () => {
    if (valid) {
      const proxy = new MapModelProxy();

      const result = await proxy.updateRoad({ id: parseInt(id!), ...road! });

      if (result) {
        navigate("/map?message=Droga została zapisana");
      } else {
        setError("Coś poszło nie tak, spróbuj ponownie później");
      }
    }
  };

  const onCancel = function () {
    navigate("/map");
  };

  return road != null ? (
    <EditRoadView
      isValid={valid}
      errorMessage={error}
      roadData={road}
      onCancel={onCancel}
      onChanged={onInputFieldChanged}
      onSubmit={onSaveRoadClicked}
    />
  ) : (
    <></>
  );
}

export default EditRoadPresenter;
