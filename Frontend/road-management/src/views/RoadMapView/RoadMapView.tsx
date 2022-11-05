import React, {useEffect, useState} from 'react';
import "./roadMapView.css";
import Map from "../RoadMapView/Map/Map"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Button, Container} from "react-bootstrap";
import {RoadDataDTO} from "../../interfaces/map/mapInterfaces";

interface IRoadMapWindow {
    roadList: RoadDataDTO[];
}

function RoadMapView({roadList}: IRoadMapWindow) {
    const [roadListDto, setRoadListDto] = useState<RoadDataDTO[]>(new Array<RoadDataDTO>());
    const [selectedDto, setSelectedDto] = useState<RoadDataDTO | undefined>(undefined);

    useEffect(() => {
        setRoadListDto(roadList);
    }, [])

    const onSelect = (item: string | null) => {
        if (item !== null) {
            const dto = roadListDto.find(dto => dto.id.toString() === item);
            setSelectedDto(dto);
        }
    }

    return (
        <div className="padded-container">
            <DropdownButton id={"road-dropdown"} variant={"info"} title={"Wybierz drogę"} onSelect={onSelect}>
                {roadListDto.map(dto => {
                    return <Dropdown.Item key={dto.id} eventKey={dto.id}>{dto.name}</Dropdown.Item>
                })}
            </DropdownButton>
            <div className="vertical-container">
                <Map roadDTO={selectedDto}/>
                <Container className="button-container">
                    <Button className="return-button">Powrót</Button>
                </Container>
            </div>
        </div>
    )
}

export default RoadMapView;