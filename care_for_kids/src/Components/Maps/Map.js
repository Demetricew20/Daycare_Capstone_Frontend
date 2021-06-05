import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import serviceLayer from "../../Service/serviceLayer";

const Map = () => {
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


  useEffect(() => {
    getAllDaycares();
    getCoordinates();
  }, [])

  let addressArray = [];
  let count = 0;


  while (count <= 0){
    allDaycares.forEach(daycare => {
      let address = `${daycare.street_address}, ${daycare.city}, ${daycare.state}`;
      addressArray.push(address);
    })

    count = 1;
  }

  console.log(allDaycares);
  console.log(addressArray);

  function getCoordinates(){
    addressArray.forEach(addy => {
      Geocode.fromAddress(addy).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );

    })

  }

  return(
    <div></div>
  )

}

export default Map