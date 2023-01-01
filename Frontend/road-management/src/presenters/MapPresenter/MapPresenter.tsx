import React, { useEffect, useState } from "react";
import RoadMapView from "../../views/RoadMapView/RoadMapView";
import { RoadDataDTO } from "../../interfaces/map/mapInterfaces";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapModelProxy } from "../../models/MapModelProxy";

function MapPresenter() {
  const navigate = useNavigate();
  const [roadList, setRoadList] = useState<RoadDataDTO[]>(
    new Array<RoadDataDTO>()
  );
  const [selectedDto, setSelectedDto] = useState<RoadDataDTO | undefined>(
    undefined
  );
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    // fetch from API
    const proxy = new MapModelProxy();
    async function fetchFromApi() {
      setRoadList(await proxy.getRoadList());
    }

    fetchFromApi();
  }, []);

  const showRoadMapWindow = function () {
    return (
      <RoadMapView
        roadList={roadList}
        message={message ?? null}
        onReturnClick={onReturnClick}
        onAddRoadClick={onAddRoadClick}
        onEditRoadClick={onEditRoadClick}
        onRoadSelect={onRoadSelect}
        selectedDto={selectedDto}
      />
    );
  };

  const onReturnClick = function () {
    navigate("/");
  };

  const onAddRoadClick = function () {
    navigate("/addRoad");
  };

  const onEditRoadClick = function () {
    if (selectedDto?.id != null) {
      navigate("/editRoad/" + selectedDto?.id?.toString());
    }
  };

  const onRoadSelect = (item: string | null) => {
    if (item !== null) {
      const dto = roadList.find((dto) => dto.id!.toString() === item);
      setSelectedDto(dto);
    }
  };

  return showRoadMapWindow();
}

export default MapPresenter;
