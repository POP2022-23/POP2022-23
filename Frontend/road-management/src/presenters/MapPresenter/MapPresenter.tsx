import React, { useEffect, useState } from "react";
import RoadMapView from "../../views/RoadMapView/RoadMapView";
import { RoadDataDTO } from "../../interfaces/map/mapInterfaces";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapModel } from "../../models/MapModel";

function MapPresenter() {
  const [roadList, setRoadList] = useState<RoadDataDTO[]>(
    new Array<RoadDataDTO>()
  );
  const [selectedDto, setSelectedDto] = useState<RoadDataDTO | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    // fetch from API
    const model = new MapModel();
    async function fetchFromApi() {
      setRoadList(await model.getRoadList());
    }

    fetchFromApi();
  }, []);

  const showRoadMapWindow = function () {
      return <RoadMapView
        roadList={roadList}
        message={message ?? null}
        onReturnClick={onReturnClick}
        onAddRoadClick={onAddRoadClick}
        onSelect={onSelect}
        selectedDto={selectedDto}
      />
  };

  const onReturnClick = function () {
    navigate("/");
  };

  const onAddRoadClick = function () {
    navigate("/addRoad");
  };

  const onSelect = (item: string | null) => {
    if (item !== null) {
      const dto = roadList.find((dto) => dto.id!.toString() === item);
      setSelectedDto(dto);
    }
  };

  return showRoadMapWindow();
}

export default MapPresenter;
