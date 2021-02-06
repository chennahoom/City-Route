import { useState, useEffect } from "react";
import TourGuideTrip from "./TourGuideTrip";
import React from 'react';

function TripList(props) {
  const [tourGuideTrips, setTourGuideTrips] = useState([]);
  const forceUpdate = React.useCallback(() => setTourGuideTrips({},[]))
  console.log(props.user.my_trips);
  // useEffect(() => {  
  //   fetch(`https://city-route.herokuapp.com/api/users/${props.user.id}`)
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setTourGuideTrips(body.my_trips);
  //       console.log(body.my_trips);
  //     })
  // }, []);

    useEffect(() => {  
      setTourGuideTrips(props.user.my_trips);
      // forceUpdate();
  }, [props.user.my_trips]);



  return (
      <div>
        {tourGuideTrips.map((tripId, i) =>(
          <TourGuideTrip
            key={i}
            data={tripId}
            listChanged={props.listChanged}
          />
        ))}
      </div>
  );
}
export default TripList;
