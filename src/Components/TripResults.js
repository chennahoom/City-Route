import React from "react";
import { useState, useEffect } from "react";

import Modal from "@material-ui/core/Modal";
import TripDetails from "../Pages/TripDetails";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory, useParams, useLocation } from "react-router-dom";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 15,
  },
  dialog: {
    width: "900px",
  },
  media: {
    height: 200,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modals: {
    position: "absolute",
    width: 400,
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
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  trips: {
    width: "35%",
    display: "inline-block",
    marginLeft: "3%",
    // width:'100%',
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TripResults(props) {
  const classes = useStyles();
  const history = useHistory();

  const [openInfoMap, setOpenInfoMap] = useState(false);

  const handleClickOpenMap = () => {
    setOpenInfoMap(true);
  };
  const handleClickCloseMap = () => {
    setOpenInfoMap(false);
  };

  const [openInfo, setOpenInfo] = useState(false);

  const handleClickOpen = () => {
    setOpenInfo(true);
  };
  const handleClickClose = () => {
    setOpenInfo(false);
  };

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
      setOpenInfo(true);
    } else {
      // history.push('/saleTrips');
      setOpenInfo(false);
      // setOpenInfo(true);
    }
  };

  return (
    <div className={classes.trips}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={img}
            title="City Gallery"
          />
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
          {/* <Button size="small" color="primary" onClick={handleOpen}>
              View Trip Map
            </Button>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modals}
              open={open}
              onClose={handleClose}
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
            </Modal> */}

          <Button size="small" color="primary" onClick={handleClickOpenMap}>
            View Map
          </Button>
          <Dialog
            open={openInfoMap}
            onClose={handleClickCloseMap}
            style={{ width: "900px" }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Map of Tour"}</DialogTitle>
            <DialogContent>
              <TripDetails
                serverUpdateUserTrips={props.serverUpdateUserTrips}
                user={props.user}
                lowPriceTrips={props.low}
                tripId={props.trip.id}
                city={props.trip.trip_name_city}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickCloseMap} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
              Join Trip
            </Button>

            <Dialog
              fullScreen
              open={openInfo}
              onClose={handleClickClose}
              TransitionComponent={Transition}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClickClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Here are discounted trips to view before you buy a full
                    priced ticket. If not, you can exit. 
                  </Typography>
                  <Button autoFocus color="inherit" onClick={handleClickClose}>
                    save
                  </Button>
                </Toolbar>
              </AppBar>
              <div className={classes.trips}>
                {props.low.map((trip) => {
                  return (
                    <div key={trip.id}>
                      <Card className={classes.root}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {trip.trip_name_city}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="h2">
                            {trip.tour_date}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="h2">
                            {trip.start_time}
                          </Typography>
                        </CardContent>
                        <Button>Join This Trip</Button>
                      </Card>
                    </div>
                  );
                })}
              </div>
              <List>
                <ListItem button>
                  <ListItemText primary="Phone ringtone" secondary="Titania" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText
                    primary="Default notification ringtone"
                    secondary="Tethys"
                  />
                </ListItem>
              </List>
            </Dialog>
          </div>

          {/* <Dialog
            open={openInfo}
            onClose={handleClickClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Before you join, we found discounted trips."}
            </DialogTitle>?
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <div>
              {props.low.map((trip) => {
                return (
                  <div key={trip.id}>
                    <span>
                      {trip.trip_name_city} + {trip.id} + {trip.ticketsBought}
                    </span>
                    <Button
                      // onClick={() => {
                      //   setOpenInfoModal(false);
                      //   history.push(
                      //     `/maps/${trip.trip_name_city}?id=${trip.id}`
                      //   );
                      // }}
                    >
                      Get info
                    </Button>
                  </div>
                );
              })}</div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleClickClose} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog> */}
        </CardActions>
      </Card>
    </div>
  );
}

export default TripResults;
