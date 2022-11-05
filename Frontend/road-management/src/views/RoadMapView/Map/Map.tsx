import React, {useEffect, useState} from 'react';
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {startLocation, mapRestriction, polylineSettings} from './MapConstants';
import {RoadDataDTO} from "../../../interfaces/map/mapInterfaces";

interface IRoadMapWindow {
    roadDTO: RoadDataDTO;
}

function Map({roadDTO}: IRoadMapWindow) {
    const [road, setRoad] = useState<RoadDataDTO>();
    const [map, setMap] = React.useState<google.maps.Map | null>(null)
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
    })

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, [])

    const onUnmount = React.useCallback(function callback(_: google.maps.Map) {
        setMap(null)
    }, [])

    const displayMarkers = function () {
        road?.nodes.forEach((node) => {
            const coords = new window.google.maps.LatLng(node.latitude, node.longitude);
            const marker = new window.google.maps.Marker({position: coords});
            marker.setMap(map);
        })
    }

    const displayLines = function () {
        const nodePath = road?.nodes.map((node) => {
            return new window.google.maps.LatLng(node.latitude, node.longitude);
        })

        const polyline = new window.google.maps.Polyline({
            path: nodePath,
            geodesic: true,
            strokeColor: polylineSettings.strokeColor,
            strokeOpacity: polylineSettings.strokeOpacity,
            strokeWeight: polylineSettings.strokeWeight,
            editable: true,
        });

        polyline.setMap(map);
    }

    useEffect(() => {
        setRoad(roadDTO);
    }, [])

    useEffect(() => {
        if (isLoaded && road !== undefined && map !== null) {
            displayMarkers();
            displayLines();
        }
    }, [map])

    return isLoaded ? (
        <GoogleMap
            mapContainerClassName="map-container"
            center={startLocation.center}
            zoom={startLocation.zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{streetViewControl: false, restriction: mapRestriction}}
        />
    ) : <></>
}

export default Map;