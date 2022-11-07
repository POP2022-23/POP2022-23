import { RoadDataDTO } from "../../interfaces/map/mapInterfaces";

const AddRoadValidator = (road: RoadDataDTO) => {
  if (isNaN(road.id)) {
    return "Niepoprawne id";
  }

  if (isNaN(road.length) || road.length <= 0) {
    return "Niepoprawna długość";
  }

  if (road.name.length === 0) {
    return "Brak nazwy";
  }

  if (road.nodes.length === 0) {
    return "Brak węzłów";
  }

  return null;
};

export default AddRoadValidator;
