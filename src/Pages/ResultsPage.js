import SearchForm from "../Components/SearchForm";

import Trip from "../Components/Trip";
import TripResult from "../Components/TripResult";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

function ResultsPage(props) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // run after render

    fetch("https://city-route.herokuapp.com/api/trips")
      .then((res) => res.json())
      .then((body) => {
        setResults(body);
        console.log(body);
      });
  }, []);

  let filteredTrips = results.filter((item) => {
    const tripDate = stringToDate(item.tour_date);
    const startDate = stringToDate(props.searhTripForm.start);
    const endData = stringToDate(props.searhTripForm.end);

    const validDate =
      tripDate.getTime() <= endData.getTime() &&
      tripDate.getTime() >= startDate.getTime();

    const validCity = props.searhTripForm.city
      ? item.trip_name_city === props.searhTripForm.city
      : true;
    return validDate && validCity;
  });



  return (
    <div>
      <section className="container">
        <h2 className="pageTitle">Where would you like to travel?</h2>
        <section className="row row-cols-1 row-cols-md-3"></section>
        {filteredTrips.map((trip) => (
          <TripResult trip={trip} />
        ))}
      </section>
    </div>
  );
}

function stringToDate(date) {
  const [day, month, year] = date.split("/");
  const result = new Date(year, month - 1, day);
  return result;
}

export default ResultsPage;
