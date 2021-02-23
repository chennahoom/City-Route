import React from "react";
import { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import TripDetails from "../Pages/TripDetails";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Paris6 from "../static/Paris6.jpg";
import Paris1 from "../static/Paris1.jpg";
import Paris2 from "../static/Paris2.jpg";
import Paris4 from "../static/Paris4.jpg";
import Paris5 from "../static/Paris5.jpg";
import Paris3 from "../static/Paris3.jpg";
import Berlin1 from "../static/Berlin1.jpg";
import Berlin2 from "../static/Berlin2.jpg";
import Berlin3 from "../static/Berlin3.jpg";
import Berlin4 from "../static/Berlin4.jpg";
import Berlin5 from "../static/Berlin5.jpg";
import Berlin6 from "../static/Berlin6.jpg";
import London from "../static/London.jpg";
import London1 from "../static/London1.jpg";
import London2 from "../static/London2.jpg";
import London3 from "../static/London3.jpg";
import London4 from "../static/London4.jpg";
import London5 from "../static/London5.jpg";
import London6 from "../static/London6.jpg";
import London7 from "../static/London7.jpg";
import amsterdam from "../static/Amsterdam.jpg";
import amsterdam1 from "../static/amsterdam1.jpg";
import amsterdam2 from "../static/amsterdam2.jpg";
import amsterdam3 from "../static/amsterdam3.jpg";
import amsterdam4 from "../static/amsterdam4.jpg";
import amsterdam5 from "../static/amsterdam5.jpg";
import telaviv1 from "../static/telaviv1.jpg";
import telaviv2 from "../static/telaviv2.jpg";
import telaviv3 from "../static/telaviv3.jpg";
import telaviv4 from "../static/telaviv4.jpg";
import telaviv5 from "../static/telaviv5.jpg";
import telaviv6 from "../static/Tel-Aviv.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 200,
    margin: 15,
    width: "45%",
  },
  media: {
    height: 200,
  },
  paper: {
    // height: 140,
    // width: 100,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    marginTop: 15,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function TripResults(props) {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const [openMapModal, setOpenMapModal] = useState(false);

  const [openTik, setOpenTik] = useState(false);
  const [openTikModal, setOpenTikModal] = useState(false);

  const [tourGuide, setTourGuide] = useState([]);

  const bull = <span className={classes.bullet}>•</span>;

  useEffect(() => {
    fetch(
      `https://city-route.herokuapp.com/api/users/${props.trip.tour_guide_id}`
    )
      .then((res) => res.json())
      .then((body) => {
        setTourGuide(body);
      });
  }, [props.trip]);

  let myImages = {
    Paris: [
      { src: Paris1 },
      { src: Paris2 },
      { src: Paris3 },
      { src: Paris4 },
      { src: Paris5 },
      { src: Paris6 },
    ],
    Berlin: [
      { src: Berlin1 },
      { src: Berlin2 },
      { src: Berlin3 },
      { src: Berlin4 },
      { src: Berlin5 },
      { src: Berlin6 },
    ],
    London: [
      { src: London1 },
      { src: London },
      { src: London3 },
      { src: London2 },
      { src: London4 },
      { src: London5 },
    ],
    TelAviv: [
      { src: telaviv2 },
      { src: telaviv5 },
      { src: telaviv3 },
      { src: telaviv4 },
      { src: telaviv1 },
      { src: telaviv6 },
    ],
    Amsterdam: [
      { src: amsterdam },
      { src: amsterdam1 },
      { src: amsterdam2 },
      { src: amsterdam3 },
      { src: amsterdam4 },
      { src: amsterdam5 },
    ],
  };

  const rand = Math.floor(Math.random() * 6);
  let img = "";
  if (props.trip?.trip_name_city === "Paris") {
    img = myImages.Paris[rand].src;
  } else if (props.trip?.trip_name_city === "Berlin") {
    img = myImages.Berlin[rand].src;
  } else if (props.trip?.trip_name_city === "London") {
    img = myImages.London[rand].src;
  } else if (props.trip?.trip_name_city === "Tel-Aviv") {
    img = myImages.TelAviv[rand].src;
  } else if (props.trip?.trip_name_city === "Amsterdam") {
    img = myImages.Amsterdam[rand].src;
  }

  const handleStops = () => {
    console.log(props.trip.stops);
    props.setShowStops(true);
    props.setStops(props.trip.stops);
  };

  const saleTrip = () => {
    if (props.low.length) {
      setOpenInfoModal(true);
    } else {
      // history.push('/saleTrips');
      setOpenInfoModal(false);
      setOpen(true);
    }
  };

  console.log(props.low);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title="City Gallery" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.trip.tour_date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Trip Name: {props.trip.trip_name_city}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Trip Tour Guide: {tourGuide.full_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Trip Start Time: {props.trip.start_time}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Trip Duration: {props.trip.tour_time}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Tickets Bought: {props.trip.ticketsBought}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => setOpenMapModal(true)}
        >
          View Trip Map
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openMapModal}
          onClose={() => setOpenMapModal(false)}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div>
            <TripDetails
              serverUpdateUserTrips={props.serverUpdateUserTrips}
              user={props.user}
              lowPriceTrips={props.low}
              tripId={props.trip.id}
              city={props.trip.trip_name_city}
            />
          </div>
        </Modal>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            // setOpenInfoModal(true);
            saleTrip();
          }}
        >
          Join Trip
        </Button>
        <Modal
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
          <Fade in={openTikModal}>
            <div className={classes.paper}>
              <h2>How many spaces do you want to save?</h2>
              <div>
                {props.low.map((trip) => {
                  return (
                    <div key={trip.id}>
                      <span>
                        {trip.trip_name_city} + {trip.id} + {trip.ticketsBought}
                      </span>
                      <button
                        onClick={() => {
                          setOpenTikModal(false);
                          history.push(
                            `/maps/${trip.trip_name_city}?id=${trip.id}`
                          );
                        }}
                      >
                        Get info
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setOpenInfoModal(false);
                  setOpenTikModal(true);
                  // numOfTic();
                }}
              >
                Current trip
              </button>
            </div>
          </Fade>
        </Modal>
      </CardActions>
    </Card>
  );
}

export default TripResults;
