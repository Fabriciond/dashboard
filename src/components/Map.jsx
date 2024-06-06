import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: 'all',
    height: '400px'
};


export function Map(props) {

    const center = {
        lat: props.lat,
        lng: props.log
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDNESuwm02SRod1FSahttV5aw4gWl5lcYc"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zooom={6}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ disableDefaultUI: true }}


        >
            { /* Child components, such as markers, info windows, etc. */
                <Marker position={center} draggable={true}  />
                
            }
            <></>
        </GoogleMap>
    ) : <></>
}

