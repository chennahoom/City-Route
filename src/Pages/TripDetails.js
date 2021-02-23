import { useHistory, useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import Map from "../Components/Map";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  console.log("tripId", tripId);

  useEffect(() => {
    fetch(`https://city-route.herokuapp.com/api/trips/${tripId}`)
      .then((res) => res.json())
      .then((body) => {
        setResults(body);
        console.log("body", body);
        tourGuideId(body.tour_guide_id);
        console.log(body.tickets_bought);
        let i = body.tickets_bought + 2;
        console.log(i);
        setTrip(tripId);
      });
  }, [tripId]);

  useEffect(() => {
    fetch(`https://city-route.herokuapp.com/api/stops/?city=${props.city}`)
      .then((res) => res.json())
      .then((body) => {
        console.log(city, body);
        console.log("props", props);
        setStops(body);
        console.log(body);
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
    console.log(info);
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
        console.log(tripId);
        console.log(info.ticketsBought);
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
    console.log(tickets);
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

      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openInfoModal}
        onClose={() => setOpenInfoModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openInfoModal}>
          <div className={classes.paper}>
            <h2>How many spaces do you want to save?</h2>
            <div>
              {props.lowPriceTrips.map((trip) => {
                return (
                  <div key={trip.id}>
                    <span>
                      {trip.trip_name_city} + {trip.id} + {trip.ticketsBought}
                    </span>
                    <Button
                      onClick={() => {
                        setOpenInfoModal(false);
                        history.push(
                          `/maps/${trip.trip_name_city}?id=${trip.id}`
                        );
                      }}
                    >
                      Get info
                    </Button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setOpenInfoModal(false);
                setOpen(true);
              }}
            >
              Current trip
            </button>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>How many spaces do you want to save?</h2>
            <FormControl
              width="10px"
              variant="filled"
              className={classes.formControl}
            >
              <InputLabel id="tick">Num of Tickets:</InputLabel>
              <Select
                labelId="tick"
                id="demo-simple-select-filled"
                value={tickets}
                onChange={handleTick}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" color="secondary" onClick={numOfTic}>
              Join Trip
            </Button>
          </div>
        </Fade>
      </Modal>*/}
    </div> 
  );
}

export default TripDetails;
