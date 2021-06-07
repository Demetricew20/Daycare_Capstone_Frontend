import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Map from './Map';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 40.0489,
  lng: -100.093735
};

function MyComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBEQFuqV4c2Tr69WoolL5i-qPfF1zNZKxQ"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
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
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {props.mapMarkers}
        
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)

