import { useHistory, useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import Map from "../Components/Map";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  timeline: {
    marginLeft: 15,
    fontSize: 15,
  },
  heading: {
    fontSize: 23,
    marginLeft: 14,
  },
}));

function TripDetails(props) {
  const history = useHistory();
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [tourGuide, setTourGuide] = useState([]);
  const [tickets, setTickets] = useState({});
  const [stops, setStops] = useState([]);
  const [trip, setTrip] = useState("");
  const [open, setOpen] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const { city } = useParams();

  const { tripId } = props;

  useEffect(() => {
    fetch(`https://city-route.herokuapp.com/api/trips/${tripId}`)
      .then((res) => res.json())
      .then((body) => {
        setResults(body);
        tourGuideId(body.tour_guide_id);
        let i = body.tickets_bought + 2;
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
        setTourGuide(body);
      });
  };

  const updateSpace = (info) => {
    fetch(`https://city-route.herokuapp.com/api/trips/${tripId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ticketsBought: info,
      }),
    })
      .then((response) => response.json())
      .then((info) => {
        setTrip(info);
      });
  };

  const saleTrip = () => {
    if (props.lowPriceTrips.length) {
      setOpenInfoModal(true);
    } else {
      setOpenInfoModal(false);
      setOpen(true);
    }
  };

  const numOfTic = () => {
    const info = parseInt(results.ticketsBought) + parseInt(tickets);
    updateSpace(info);
    props.serverUpdateUserTrips(tripId);
  };

  const handleTick = (event) => {
    event.preventDefault();
    setTickets(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
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
