import React, { useEffect, useState } from "react";
import "./roadMapView.css";
import Map from "../RoadMapView/Map/Map";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Alert, Button, Container } from "react-bootstrap";
import { RoadDataDTO } from "../../interfaces/map/mapInterfaces";

interface IRoadMapWindow {
  roadList: RoadDataDTO[];
  selectedDto: RoadDataDTO | undefined;
  message: string | null;
  onReturnClick: () => void;
  onAddRoadClick: () => void;
  onRoadSelect: (item: string | null) => void;
}

function RoadMapView({
  roadList,
  message,
  onReturnClick,
  onAddRoadClick, 
  onRoadSelect,
  selectedDto,
}: IRoadMapWindow) {
  const [roadListDto, setRoadListDto] = useState<RoadDataDTO[]>(
    new Array<RoadDataDTO>()
  );

  useEffect(() => {
    setRoadListDto(roadList);
  }, [roadList]);

  const launchRoadMap = function () {
    return (
      <div className="main-container">
        <h3 className="page-title">Mapa sieci drogowej</h3>
        {message ? <Alert>{message}</Alert> : null}
        <div className="content-container">
          <DropdownButton
            id={"road-dropdown"}
            variant={"info"}
            title={"Wybierz drogę"}
            onSelect={onRoadSelect}
          >
            {roadListDto.map((dto) => {
              return (
                <Dropdown.Item key={dto.id} eventKey={dto.id}>
                  {dto.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
          <div className="vertical-container">
            <Map roadDTO={selectedDto} />
            <Container className="button-container">
              <Button className="navigation-button" onClick={onReturnClick}>
                Powrót
              </Button>
              <Button className="navigation-button" onClick={onAddRoadClick}>
                Dodaj drogę
              </Button>
            </Container>
          </div>
        </div>
      </div>
    );
  };

  return launchRoadMap();
}

export default RoadMapView;
