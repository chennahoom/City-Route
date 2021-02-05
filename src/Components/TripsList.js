import { useState, useEffect } from "react";
import TourGuideTrip from "./TourGuideTrip";

function TripList(props) {
  const [tourGuideTrips, setTourGuideTrips] = useState([]);

  useEffect(() => {
    fetch(`https://city-route.herokuapp.com/api/users/${props.user.id}`)
      .then((res) => res.json())
      .then((body) => {
        setTourGuideTrips(body.my_trips);
        console.log(body.my_trips);
      });
  }, []);

  return (
      <div>
        {tourGuideTrips.map((tripId, i) =>(
          <TourGuideTrip
            key={i}
            data={tripId}
          />
        ))}
      </div>
  );
}
export default TripList;
