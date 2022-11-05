import React from 'react';
import "./roadMapView.css";
import Map from "../RoadMapView/Map/Map"
import {Button, Container} from "react-bootstrap";
import {RoadDataDTO} from "../../interfaces/map/mapInterfaces";

interface IRoadMapWindow {
    roadDTO: RoadDataDTO;
}

function RoadMapView({roadDTO}: IRoadMapWindow) {
    return (
        <Container className="padded-container">
            <Map roadDTO={roadDTO}/>
            <Container className="button-container">
                <Button className="return-button">Powrót</Button>
            </Container>
        </Container>
    )
}

export default RoadMapView;