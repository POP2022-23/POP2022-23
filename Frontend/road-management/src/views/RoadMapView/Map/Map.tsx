import React from 'react';
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {startLocation, mapRestriction} from './MapConstants';

function Map() {
    const [map, setMap] = React.useState<google.maps.Map | null>(null)
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY!
    })

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds(startLocation.center);
        map.fitBounds(bounds);
        setMap(map);
    }, [])

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, [])

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