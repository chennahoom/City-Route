import { Link } from "react-router-dom";
import { useState,useEffect } from "react";


function TripList(props) {

	const [trips, setTrips] = useState([]);

	useEffect(() => {
		fetch('https://city-route.herokuapp.com/api/trips')
			.then(res => res.json())
			.then(body => {
				setTrips(body);
			});
	}, []);

  return (
    <section className="row row-cols-1 row-cols-md-3" id="All-trips">
      <section className="col mb-4">
        <div className="card bg-light text-dark">
          <div className="card-body">
            <h5 className="card-title">{props.trip.tour_date}</h5>
            <p className="card-text">{props.trip.stops} </p>
            <p className="card-text">
              tour ID: {props.trip.id}
              <br />
              tour guide: {props.trip.tour_guide_id}
              <br />
              trip name city: {props.trip.trip_name_city}
              <br />
              tour time: {props.trip.tour_time}
              <br />
              start time: {props.trip.start_time}
              <br />
              spaces left: {props.trip.spaces_left}
              <br />
            </p>
            <Link to={`/map/${props.trip.id}`}>
              <button className="join-trip" id={props.trip.id}>
                Join Trip
              </button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
export default TripList;
