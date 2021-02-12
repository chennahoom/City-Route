import { useState, useEffect } from "react";
import TourGuideTrip from "./TourGuideTrip";
import React from 'react';

function TripList(props) {

  return (
    <div>
      {props.tourGuideTrips.map((tripId, i) => (
        <TourGuideTrip
          key={i}
          data={tripId}
          listChanged={props.listChanged}
          deleteTrip={props.deleteTrip}
          addTrip = {props.addTrip}
        />
      ))}
    </div>
  );
}
export default TripList;
