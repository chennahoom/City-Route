import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TourGuideTrip from "./TourGuideTrip";

function TripList(props) {
  const [tourGuidTrips, setTourGuidTrips] = useState([]);

  useEffect(() => {
    fetch(`https://city-route.herokuapp.com/api/users/${props.user.id}`)
      .then((res) => res.json())
      .then((body) => {
        setTourGuidTrips(body.my_trips);
        console.log(body.my_trips);
        console.log(props.userTrips)
      });
  }, []);

  return (
      <div>
        {tourGuidTrips.map((tripId, i) =>(
          <TourGuidTrip
            key={i}
            data={tripId}
            userTrips={props.userTrips}
          />
        ))}
      </div>
  );
}
export default TripList;
