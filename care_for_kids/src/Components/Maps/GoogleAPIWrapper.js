import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Map from './Map';

const containerStyle = {
  width: '600px',
  height: '600px'
};

function MyComponent(props) {

  useEffect(() => {
  }, [props])

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

  const centerMap = () => {
    if(props.searchLocation){
      return props.searchLocation;
    }
    else{
      return props.parentLocation;
    }
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerMap()}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {props.mapMarkers}
        
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)

