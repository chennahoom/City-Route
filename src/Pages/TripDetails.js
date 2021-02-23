import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import Map from "../Components/Map";


function TripDetails(props) {
  const [results, setResults] = useState([]);
  const [stops, setStops] = useState([]);
  const [trip, setTrip] = useState("");

  const { city } = useParams();

  const { tripId } = props;

  useEffect(() => {
    fetch(`https://city-route.herokuapp.com/api/trips/${tripId}`)
      .then((res) => res.json())
      .then((body) => {
        setResults(body);
        tourGuideId(body.tour_guide_id);
        setTrip(tripId);
      });
  }, [tripId]);

  useEffect(() => {
    fetch(`https://city-route.herokuapp.com/api/stops/?city=${props.city}`)
      .then((res) => res.json())
      .then((body) => {
        setStops(body);
      });
  }, [city]);

  const tourGuideId = (id) => {
    fetch(`https://city-route.herokuapp.com/api/users/${id}`)
      .then((res) => res.json())
      .then((body) => {
      });
  };

  const filteredStops = stops.filter((stop) =>
    results?.stops?.includes(stop.id)
  );

  return (
    <div>
      <Map trip={trip} city={props.city} stops={filteredStops} />
    </div>
  );
}

export default TripDetails;
