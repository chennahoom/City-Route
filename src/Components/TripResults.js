import React from "react";
import { useState, useEffect } from "react";
import TripDetails from "../Pages/TripDetails";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
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
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 15,
    width: "400px",
  },
  trips: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
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

  const [openJoin, setOpenJoin] = useState(false);

  const handleClickOpenJoin = () => {
    setOpenJoin(true);
  };
  const handleCloseJoin = () => {
    setOpenJoin(false);
  };

  const [openJoinEx, setOpenJoinEx] = useState(false);

  const handleClickOpenJoinEx = () => {
    setOpenJoinEx(true);
  };
  const handleCloseJoinEx = () => {
    setOpenJoinEx(false);
  };

  const [tourGuide, setTourGuide] = useState([]);

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

  const [results, setResults] = useState([]);
  const [tickets, setTickets] = useState({});
  const [trip, setTrip] = useState("");

  useEffect(() => {
    fetch(`https://city-route.herokuapp.com/api/trips/${props.trip.id}`)
      .then((res) => res.json())
      .then((body) => {
        setResults(body);
        tourGuideId(body.tour_guide_id);
        let i = body.tickets_bought + 2;
        setTrip(props.trip.id);
      });
  }, [props.trip.id]);

  const tourGuideId = (id) => {
    fetch(`https://city-route.herokuapp.com/api/users/${id}`)
      .then((res) => res.json())
      .then((body) => {
        setTourGuide(body);
      });
  };

  const updateSpace = (info) => {
    fetch(`https://city-route.herokuapp.com/api/trips/${props.trip.id}`, {
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

  const numOfTic = () => {
    const info = parseInt(results.ticketsBought) + parseInt(tickets);
    updateSpace(info);
    props.serverUpdateUserTrips(props.trip.id);
  };

  const handleTick = (event) => {
    event.preventDefault();
    setTickets(event.target.value);
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
              Trip Tour Guide: {tourGuide?.full_name}
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
          <Button size="small" color="primary" onClick={handleClickOpenMap}>
            View Map
          </Button>
          <Dialog
            open={openInfoMap}
            onClose={handleClickCloseMap}
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
                  <Button
                    autoFocus
                    color="inherit"
                    onClick={handleClickOpenJoinEx}
                  >
                    Exit and Join Selected Trip
                  </Button>
                  <Dialog
                    open={openJoinEx}
                    onClose={handleCloseJoinEx}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"How many tickets would you like to buy?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
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
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseJoin} color="primary">
                        Exit
                      </Button>
                      <Button
                        onClick={() => {
                          handleCloseJoinEx();
                          numOfTic();
                          history.push("/myTripsPage");
                        }}
                        color="primary"
                        autoFocus
                      >
                        Join
                      </Button>
                    </DialogActions>
                  </Dialog>
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
                        <Button onClick={handleClickOpenJoin}>
                          Join This Trip
                        </Button>
                        <Dialog
                          open={openJoin}
                          onClose={handleCloseJoin}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"How many tickets would you like to buy?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
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
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseJoin} color="primary">
                              Exit
                            </Button>
                            <Button
                              onClick={() => {
                                handleCloseJoin();
                                numOfTic();
                                history.push("/myTripsPage");
                              }}
                              color="primary"
                              autoFocus
                            >
                              Join
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </Dialog>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default TripResults;
