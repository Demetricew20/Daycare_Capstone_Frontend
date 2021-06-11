import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import serviceLayer from "../../Service/serviceLayer";
import { Marker, DistanceMatrixService } from '@react-google-maps/api';
import GoogleAPIWrapper from "./GoogleAPIWrapper";

const Map = (props) => {


  const key = "AIzaSyBEQFuqV4c2Tr69WoolL5i-qPfF1zNZKxQ"
  Geocode.setApiKey(key);
  Geocode.setLanguage("en");
  Geocode.setRegion("us");

  // const distance = require('google-distance-matrix');
  // distance.key(key);
  // distance.units('imperial');
  // distance.mode('driving');

  const [markers, setMarkers] = useState([])
  const [allDaycares, setAllDaycares] = useState([]);
  const [parent, setParent] = useState();
  const [searchLocation, setSearchLocation] = useState();
  const [radius, setRadius] = useState();
  const [parentLocation, setParentLocation] = useState();

  // set location_type filter . Its optional.
  // google geocoder returns more that one address for given lat/lng.
  // In some case we need one address as response for which google itself provides a location_type filter.
  // So we can easily parse the result for fetching address components
  // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
  // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
  Geocode.setLocationType("ROOFTOP");

  // Enable or disable logs. Its optional.
  Geocode.enableDebug();

  const getAllDaycares = () => {
      serviceLayer.getAllDaycares()
      .then(response => {
        setAllDaycares(response.data);
      })
      .catch(err => (console.log(err)))
  }

  let addressArray = [];


  useEffect(() => {
    getAllDaycares();
    getAddress();
    setParent(props.parent);
    setRadius(props.radius);
  }, [props])

  useEffect(() => {
    getCoordinates();
    searchLocationCoordinates();
    // getDistance();
    if(parent){
      getParentCoordinates();
    }
  }, [allDaycares])

  function getAddress(){
    allDaycares.forEach(daycare => {
      let address = `${daycare.street_address}, ${daycare.city}, ${daycare.state}`;
      addressArray.push(address);
    })
  }

  let origins = [parentLocation];
  let destinations = [{lat: 61.157, lng: -149.833}]

  // const getDistance = () => {
  //   debugger;
  //   const matrix = new google.maps.DistanceMatrixService();

  //   matrix.getDistanceMatrix({
  //     origins: [new google.maps.LatLng(25.7694708, -80.259947)],
  //     destinations: [new google.maps.LatLng(25.768915, -80.254659)],
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   }, function(response, status) {
  //     console.log(response);
  //   });
  // }

  function getCoordinates(){
    addressArray.forEach(addy => {
      Geocode.fromAddress(addy).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        if ({lat, lng} in markers){
          console.log('marker exists');
        }
        else{
          setMarkers(markers => [...markers, {lat, lng}])
        }
      },
      (error) => {
        console.error(error);
      }
    );
    })
  }

  function getParentCoordinates(){
    let address = `${parent.street_address}, ${parent.city}, ${parent.state}`;
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setParentLocation({lat, lng})
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  function searchLocationCoordinates(){
    if(props.searchLocation){
      Geocode.fromAddress(props.searchLocation).then(
        (response) => {
          const {lat, lng } = response.results[0].geometry.location;
          setSearchLocation({lat, lng})
        }
      )
    }
  }

  const mapCoordinates = () => {
    return(
      markers.map((m, i) => {
        return (<Marker key={i} position={{lat: m.lat, lng: m.lng}} />)
      })
    )
  }

  return(
    <>
    <GoogleAPIWrapper mapMarkers={mapCoordinates()} parentLocation={parentLocation} searchLocation={searchLocation} />
    </>
  )

}

export default Map