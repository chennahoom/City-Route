import TripResults from "../Components/TripResults";
import { useEffect, useState } from "react";

function ResultsPage(props) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // run after render

    fetch("https://city-route.herokuapp.com/api/trips")
      .then((res) => res.json())
      .then((body) => {
        setResults(body);
      });
  }, []);

  console.log("searchTripForm", props.searchTripForm);

  let filteredTrips = results.filter((item) => {
    const tripDate = stringToDate(item.tour_date);
    const startDate = stringToDate(props.searchTripForm.start);
    const endData = stringToDate(props.searchTripForm.end);

    const validDate =
      tripDate.getTime() <= endData.getTime() &&
      tripDate.getTime() >= startDate.getTime();

    const validCity = props.searchTripForm.city
      ? item.trip_name_city === props.searchTripForm.city
      : true;
    return validDate && validCity;
  });

  return (
    <div>
      <section className="container">
        <h2 className="pageTitle">Where would you like to travel?</h2>
        <section className="row row-cols-1 row-cols-md-3"></section>
        {filteredTrips.map((trip) => (
          <TripResults trip={trip} />
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
