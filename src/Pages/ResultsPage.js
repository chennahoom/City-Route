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
    // height:1200,
    // objectFit:'cover',
    // height: 1230,
    // backgroundColor:
    // 	theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
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
        console.log("searchTripForm", props.searchTripForm);

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

        console.log("filteredTrips", filteredTrips);
        const lowPriceTrips = filteredTrips.filter(
          (trip) => trip.ticketsBought >= 10
        );
        setLow(lowPriceTrips);
        setResults(filteredTrips);
        props.setLowPriceTrips(lowPriceTrips);
      });
  },[]);

  console.log(low);

  return (
    <div className="results">
      <Typography variant="h3">
        Welcome to {props.searchTripForm.city}!
      </Typography>

      <section id="left">
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
