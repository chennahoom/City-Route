import { useState, useEffect } from "react";
import TourGuideTrip from "./TourGuideTrip";
import React from 'react';

function TripList(props) {

<<<<<<< HEAD
=======
    useEffect(() => {  
      if (props.user.my_trips ==! undefined)
      setTourGuideTrips(props.user.my_trips);
      // forceUpdate();
  }, [props.user.my_trips]);
>>>>>>> 5916770b59089cea42a63ad252600cea9e6dde03



  return (
    <div>
      {props.tourGuideTrips.map((tripId, i) => (
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
