import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import serviceLayer from "../../Service/serviceLayer";
import { Marker } from '@react-google-maps/api';
import GoogleAPIWrapper from "./GoogleAPIWrapper";

const Map = (props) => {

  const [markers, setMarkers] = useState([])

  Geocode.setApiKey("AIzaSyBEQFuqV4c2Tr69WoolL5i-qPfF1zNZKxQ");
  Geocode.setLanguage("en");
  Geocode.setRegion("us");

  const [allDaycares, setAllDaycares] = useState([]);

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
  }, [props])

  useEffect(() => {
    getCoordinates();
  }, [allDaycares])

  let count = 0;


  // while (count <= 0){
  //   allDaycares.forEach(daycare => {
  //     let address = `${daycare.street_address}, ${daycare.city}, ${daycare.state}`;
  //     addressArray.push(address);
  //   })

    

  //   count = 1;
  // }

  function getAddress(){
    allDaycares.forEach(daycare => {
      let address = `${daycare.street_address}, ${daycare.city}, ${daycare.state}`;
      addressArray.push(address);
    })
  }

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
        
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
    })
  }

  const mapLat = () => {
    return(
      markers.map(m => {
        return (<Marker position={{lat: m.lat, lng: m.lng}} />)
      })
    )
  }



  return(
    <>
    <GoogleAPIWrapper mapMarkers={mapLat()} />
    </>
  )

}

export default Map