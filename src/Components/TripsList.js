import { useState, useEffect } from "react";
import TourGuideTrip from "./TourGuideTrip";
import React from 'react';

function TripList(props) {

  //   useEffect(() => {  
  //     if (props.user.my_trips ==! undefined)
  //     setTourGuideTrips(props.user.my_trips);
  //     // forceUpdate();
  // }, [props.user.my_trips]);



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
