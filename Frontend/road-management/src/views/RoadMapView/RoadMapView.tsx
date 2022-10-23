import React from 'react';
import "./roadMapView.css";
import Map from "../RoadMapView/Map/Map"
import {Button, Container} from "react-bootstrap";

function RoadMapView(){
    return (
        <Container className="padded-container">
            <Map></Map>
            <Container className="button-container">
                <Button className="return-button">Powrót</Button>
            </Container>
        </Container>
    )
}

export default RoadMapView;