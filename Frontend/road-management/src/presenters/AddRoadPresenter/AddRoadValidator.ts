import { RoadDataDTO } from "../../interfaces/map/mapInterfaces";

const AddRoadValidator = (road: RoadDataDTO) => {
  if (isNaN(road.length) || road.length <= 0) {
    return "Niepoprawna długość";
  }

  if (road.name.length === 0) {
    return "Brak nazwy";
  }

  if (road.nodes.length < 2) {
    return "Zbyt mało węzłów";
  }

  return null;
};

export default AddRoadValidator;
