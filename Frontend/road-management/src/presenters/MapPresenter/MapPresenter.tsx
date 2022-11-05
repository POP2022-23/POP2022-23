import React, {useEffect, useState} from 'react';
import RoadMapView from "../../views/RoadMapView/RoadMapView";
import {RoadDataDTO} from "../../interfaces/map/mapInterfaces";

function MapPresenter() {
    const [roadList, setRoadList] = useState<RoadDataDTO[]>(new Array<RoadDataDTO>());

    useEffect(() => {
        // fetch from API

        // for now mock it
        const roadListMock : RoadDataDTO[] = [
            {id: 1, length: 327.3, name: "A1", 
                nodes: [
                    {id: 1, latitude: 54.235290, longitude: 18.608770},
                    {id: 2, latitude: 52.984995, longitude: 18.736113},
                    {id: 3, latitude: 51.892356, longitude: 19.634365},
                    {id: 4, latitude: 49.946041, longitude: 18.431327}
                ]},
            {id: 2, length: 672.8, name: "A4",
                nodes: [
                    {id: 5, latitude: 51.172534, longitude: 15.030048},
                    {id: 6, latitude: 51.045071, longitude: 16.934628},
                    {id: 7, latitude: 50.085991, longitude: 19.802727},
                    {id: 8, latitude: 49.962884, longitude: 23.069728}
                ]},
        ];
        
        setRoadList(roadListMock);
    }, []);
    
    const showRoadMapWindow = function() : JSX.Element{
        return roadList.length !== 0 ? <RoadMapView roadDTO={roadList[0]}></RoadMapView> : <></>;
    }
        
    return (
        <>
            {showRoadMapWindow()}
        </>
    )
}

export default MapPresenter;