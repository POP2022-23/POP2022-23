import React, {useEffect, useState} from 'react';
import "./roadMapView.css";
import Map from "../RoadMapView/Map/Map"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Button, Container} from "react-bootstrap";
import {RoadDataDTO} from "../../interfaces/map/mapInterfaces";

interface IRoadMapWindow {
    roadList: RoadDataDTO[];
    selectedDto: RoadDataDTO | undefined;
    onReturnClick: () => void;
    onSelect: (item: string | null) => void;
}

function RoadMapView({roadList, onReturnClick, onSelect, selectedDto}: IRoadMapWindow) {
    const [roadListDto, setRoadListDto] = useState<RoadDataDTO[]>(new Array<RoadDataDTO>());

    useEffect(() => {
        setRoadListDto(roadList);
    }, [])
    
    const launchRoadMap = function () {
        return (
            (
                <div className="padded-container">
                    <DropdownButton id={"road-dropdown"} variant={"info"} title={"Wybierz drogę"} onSelect={onSelect}>
                        {roadListDto.map(dto => {
                            return <Dropdown.Item key={dto.id} eventKey={dto.id}>{dto.name}</Dropdown.Item>
                        })}
                    </DropdownButton>
                    <div className="vertical-container">
                        <Map roadDTO={selectedDto}/>
                        <Container className="button-container">
                            <Button className="return-button" onClick={onReturnClick}>Powrót</Button>
                        </Container>
                    </div>
                </div>
            )
        )
    }

    return launchRoadMap();
}

export default RoadMapView;