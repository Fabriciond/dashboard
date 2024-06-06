import React, { useCallback, useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px'
};


export function Map(props) {
    const { lat, lng, onMarkerPositionChange } = props;
    const center = {
        lat: lat,
        lng: lng
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDNESuwm02SRod1FSahttV5aw4gWl5lcYc"
    })

    const [map, setMap] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(center);
    const [zoom, setZoom] = useState(7); // Estado para almacenar el zoom actual
    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(markerPosition);
        map.fitBounds(bounds);

        setMap(map)
    }, [markerPosition])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    const onMarkerDragEnd = useCallback((event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        const newPosition = { lat: newLat, lng: newLng };
        setMarkerPosition(newPosition);
        onMarkerPositionChange(newPosition); // Llama a la función de devolución de llamada con la nueva posición del marker
    }, [onMarkerPositionChange]);


    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={5}

            options={{ disableDefaultUI: true }}
        >
            { /* Child components, such as markers, info windows, etc. */
                <Marker zoom={7} position={markerPosition} draggable={true} onDragEnd={onMarkerDragEnd} />

            }
            <></>
        </GoogleMap>
    ) : <></>
}

