import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect, useRef } from "react";
import MapTG from "../Components/MapTourGuide";
import { Link as Scroll } from "react-scroll";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "white",
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "none",
    height: "150%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  label: {
    marginBottom: -7,
    marginTop: 14,
    fontSize: 19,
  },

  gridForm: {
    boxShadow: "none",
    height: "60%",
  },
  goDown: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

function AddTripForm(props) {
  const classes = useStyles();

  const cities = [
    {
      value: "Berlin",
      label: "Berlin",
    },
    {
      value: "Tel-Aviv",
      label: "Tel-Aviv",
    },
    {
      value: "Paris",
      label: "Paris",
    },
    {
      value: "Amsterdam",
      label: "Amsterdam",
    },
    {
      value: "London",
      label: "London",
    },
  ];

  const [currency, setCurrency] = useState("");

  const initForm = {
    trip_name_city: "",
    tour_date: "",
    tour_guide_id: props.user?.id,
    tour_time: "",
    start_time: "",
    ticketsBought: 0,
  };

  const formRef = useRef(null);
  const [trip, setTrip] = useState(props.editTrip || initForm);
  const [stops, setStops] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);

  useEffect(() => {
    if (props.editTrip) {
      setTrip(props.editTrip);
      setSelectedStops(props.editTrip.stops);
    }
  }, [props.editTrip]);

  useEffect(() => {
    async function getStops() {
      if (!trip.trip_name_city) return;
      const res = await fetch(
        `https://city-route.herokuapp.com/api/stops/?city=${trip.trip_name_city}`
      );
      const body = await res.json();
      setStops(body);

      if (props.editTrip) {
        setSelectedStops(props.editTrip.stops);
      } else {
        setSelectedStops([]);
      }
    }

    getStops();
  }, [trip.trip_name_city]);

  const handleInputChange = (event) => {
    if (event.target.name === "trip_name_city") {
      setCurrency(event.target.value);
    }
    const { name, value } = event.target;
    setTrip({ ...trip, [name]: value });
  };

  const onSave = (event) => {
    event.preventDefault();
    if (
      !trip.trip_name_city ||
      !trip.tour_date ||
      !trip.tour_time ||
      !trip.start_time
    )
      return;
    trip.stops = selectedStops;

    if (!editTrip) {
      props.addTrip(trip);
    } else {
      // udate trip
      props.updateTrip(trip, trip.id);
    }
    formRef.current.reset(); // reset form
    setSelectedStops([]);
    setTrip(initForm);
    setStops([]);
  };

  function toggledStop(id) {
    const exists = selectedStops.find((stopId) => stopId === id);
    if (exists) {
      setSelectedStops(selectedStops.filter((stopId) => stopId !== id));
    } else {
      setSelectedStops([...selectedStops, id]);
    }
  }

  const { editTrip } = props;

  const tour_time = editTrip?.tour_time;
  const tour_date = editTrip?.tour_date;
  const start_time = editTrip?.start_time;

  const handleCity = (event) => {
    event.preventDefault();
    props.updateForm(event);
    setCurrency(event.target.value);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        className={classes.gridForm}
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add New Trip
          </Typography>
          <form className={classes.form} ref={formRef} onSubmit={onSave}>
            <label className="labels">
              City:
              <select
                className="inputs"
                value={trip.trip_name_city}
                name="trip_name_city"
                onChange={handleInputChange}
              >
                <option value="">Choose</option>
                <option selected value="Tel-Aviv">
                  Tel-Aviv
                </option>
                <option value="Berlin">Berlin</option>
                <option value="London">London</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Paris">Paris</option>
              </select>
              <br />
            </label>

            <br />

            <label className="labels">
              Tour-Date
              <input
                className="inputs"
                defaultValue={tour_date}
                type="text"
                placeholder="01/06/2021"
                name="tour_date"
                onChange={handleInputChange}
              />
              <br />
            </label>
            <br />

            <label className="labels">
              Tour-Time
              <br />
              <input
                placeholder="1-2 "
                className="inputs"
                defaultValue={tour_time}
                type="text"
                name="tour_time"
                onChange={handleInputChange}
              />
              <br />
            </label>
            <br />
            <label className="labels">
              Start-Time
              <br />
              <input
                placeholder="10:00AM"
                className="inputs"
                type="text"
                defaultValue={start_time}
                name="start_time"
                onChange={handleInputChange}
              />
              <br />
            </label>

            <label className={classes.label}>
              {stops.map((stop) => {
                return (
                  <div key={stop.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedStops.includes(stop.id)}
                          value={stop.stop_name}
                          color="primary"
                          onChange={() => toggledStop(stop.id)}
                        />
                      }
                      label={stop.stop_name}
                    />
                  </div>
                );
              })}
            </label>
            <Button
            
              onClick={onSave}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              
              className={classes.submit}
            >
              {props.editTrip ? "Save" : "Add"}
            </Button>

            <Scroll to="trip-list" smooth={true}>
              <IconButton>
                <ExpandMoreIcon className={classes.goDown} />
              </IconButton>
            </Scroll>
          </form>
        </div>
      </Grid>

      <Grid className={classes.gridMap} item xs={false} sm={4} md={7}>
        <MapTG stops={stops} trip={trip} selectedStops={selectedStops} />
      </Grid>
    </Grid>
  );
}

export default AddTripForm;
