import { useEffect, useState } from "react";

import TripResults from "../Components/TripResults";
import Amsterdam from "../static/Amsterdam.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    heigh: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    backgroundImage: `url(${Amsterdam})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  cards: {
    width: "80px",
    marginTop: theme.spacing(1),
  },
}));

function ResultsPage(props) {
  const classes = useStyles();

  const [results, setResults] = useState([]);
  const [low, setLow] = useState([]);
  const [stops, setStops] = useState([]);
  const [showStops, setShowStops] = useState(false);

  useEffect(() => {
    fetch("https://city-route.herokuapp.com/api/trips")
      .then((res) => res.json())
      .then((body) => {
        let filteredTrips = body.filter((item) => {
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

        const lowPriceTrips = filteredTrips.filter(
          (trip) => trip.ticketsBought >= 10
        );
        setLow(lowPriceTrips);
        setResults(filteredTrips);
        props.setLowPriceTrips(lowPriceTrips);
      });
  }, []);

  return (
    <div className="results">
      <Typography variant="h3">
        Welcome to {props.searchTripForm.city}!
      </Typography>

      <section id="left">
        {results.length > 0?(
          <div className="list-results">
            {results.map((trip, i) => (
              <TripResults
                setShowStops={setShowStops}
                serverUpdateUserTrips={props.serverUpdateUserTrips}
                low={low}
                trip={trip}
                key={i}
                setStops={setStops}
              />
            ))}
          </div>
        ):(
          <div>
              <h3>No trips found!</h3> 
          </div>
        )}

      </section>
    </div>
  );
}

function stringToDate(date) {
  if (!date) return new Date();
  const [day, month, year] = date.split("/");
  const result = new Date(year, month - 1, day);
  return result;
}

export default ResultsPage;
