import React, {useEffect, useState} from 'react';
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {mapRestriction, polylineSettings, startLocation} from './MapConstants';
import {RoadDataDTO} from "../../../interfaces/map/mapInterfaces";

interface IMapComponent {
    roadDTO: RoadDataDTO | undefined;
}

function Map({roadDTO}: IMapComponent) {
    const [road, setRoad] = useState<RoadDataDTO>();
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [currentPolyline, setCurrentPolyline] = useState<google.maps.Polyline>();
    const [currentMarkers, setCurrentMarkers] = useState<google.maps.Marker[]>();
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
        currentMarkers?.forEach(marker => {
            marker.setMap(null);
        })
        
        const markers = road?.nodes.map(node => {
            const coords = new window.google.maps.LatLng(node.latitude, node.longitude);
            return new window.google.maps.Marker({position: coords});
        })

        setCurrentMarkers(markers);

        markers?.forEach(marker => {
            marker.setMap(map);
        })
    }

    const displayLines = function () {
        currentPolyline?.setMap(null);
        
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

        setCurrentPolyline(polyline);
        polyline.setMap(map);
    }

    useEffect(() => {
        if (roadDTO !== undefined) {
            setRoad(roadDTO);
        }
    }, [roadDTO])

    useEffect(() => {
        if (isLoaded && road !== undefined && map !== null) {
            displayMarkers();
            displayLines();
        }
    }, [isLoaded, road, map])

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