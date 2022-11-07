import React, { useEffect, useState } from "react";
import RoadMapView from "../../views/RoadMapView/RoadMapView";
import { RoadDataDTO } from "../../interfaces/map/mapInterfaces";
import { useNavigate } from "react-router-dom";

function MapPresenter() {
  const [roadList, setRoadList] = useState<RoadDataDTO[]>(
    new Array<RoadDataDTO>()
  );
  const [selectedDto, setSelectedDto] = useState<RoadDataDTO | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    // fetch from API

    // for now mock it
    const roadListMock: RoadDataDTO[] = [
      {
        id: 1,
        length: 327.3,
        name: "A1",
        nodes: [
          { id: 1, latitude: 54.23529, longitude: 18.60877 },
          { id: 2, latitude: 52.984995, longitude: 18.736113 },
          { id: 3, latitude: 51.892356, longitude: 19.634365 },
          { id: 4, latitude: 49.946041, longitude: 18.431327 },
        ],
      },
      {
        id: 4,
        length: 672.8,
        name: "A4",
        nodes: [
          { id: 5, latitude: 51.172534, longitude: 15.030048 },
          { id: 6, latitude: 51.045071, longitude: 16.934628 },
          { id: 7, latitude: 50.085991, longitude: 19.802727 },
          { id: 8, latitude: 49.962884, longitude: 23.069728 },
        ],
      },
      {
        id: 17,
        length: 180,
        name: "S17",
        nodes: [
          { id: 9, latitude: 52.222403, longitude: 21.253135 },
          { id: 9, latitude: 51.900726, longitude: 21.582348 },
          { id: 9, latitude: 51.635084, longitude: 21.957613 },
          { id: 9, latitude: 51.284598, longitude: 22.452175 },
          { id: 9, latitude: 51.14632, longitude: 22.857308 },
        ],
      },
    ];

    setRoadList(roadListMock);
  }, []);

  const showRoadMapWindow = function () {
    return roadList.length !== 0 ? (
      <RoadMapView
        roadList={roadList}
        onReturnClick={onReturnClick}
        onAddRoadClick={onAddRoadClick}
        onSelect={onSelect}
        selectedDto={selectedDto}
      />
    ) : (
      <></>
    );
  };

  const onReturnClick = function () {
    console.log("Navigating to DashboardView");
    // Navigate to DashboardView
  };

  const onAddRoadClick = function () {
    navigate("/addRoad");
  };

  const onSelect = (item: string | null) => {
    if (item !== null) {
      const dto = roadList.find((dto) => dto.id.toString() === item);
      setSelectedDto(dto);
    }
  };

  return showRoadMapWindow();
}

export default MapPresenter;
