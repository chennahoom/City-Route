import { useEffect, useState } from "react";
import Map from "../Components/Map";
import { Link } from "react-router-dom";
import React from "react";
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
    marginTop: "150px",
    width: "25%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  media: {
    height: 200,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    marginTop: 15,
  },
  tripList: {
    display: "flex",
    flexWrap: "wrap",
	alignContent: "space-around",
    background: "red",
  },
}));

function TourGuideTrip(props) {
  const classes = useStyles();

  const [tripData, setTripData] = useState(props.data);

  console.log("props.editTrip", props.editTrip);
  useEffect(() => {
    console.log("props.useEffect", props.editTrip);
    fetch(`https://city-route.herokuapp.com/api/trips/${props.data}`)
      .then((res) => res.json())
      .then((body) => {
        if (body) {
          setTripData(body);
        }
        console.log(body);
        console.log(props.data);
      });
  }, [props.editTrip]);

  const handleDelete = () => {
    console.log(props.data);
    props.deleteTrip(props.data);
  };

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
  if (tripData?.trip_name_city === "Paris") {
    img = myImages.Paris[rand].src;
  } else if (tripData?.trip_name_city === "Berlin") {
    img = myImages.Berlin[rand].src;
  } else if (tripData?.trip_name_city === "London") {
    img = myImages.London[rand].src;
  } else if (tripData?.trip_name_city === "Tel-Aviv") {
    img = myImages.TelAviv[rand].src;
  } else if (tripData?.trip_name_city === "Amsterdam") {
    img = myImages.Amsterdam[rand].src;
  }

  return (
    <div className={classes.tripList}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            // src={Berlin}
            image={img}
            title="City"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Trip Name: {tripData?.trip_name_city}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Tour Date: {tripData?.tour_date}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Start Time: {tripData?.start_time}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Tour Duration: {tripData?.tour_time}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={() => props.onDuplicate(tripData)}
            size="small"
            color="primary"
          >
            Duplicate Trip
          </Button>
          <Button
            onClick={() => props.setEditTrip(tripData)}
            size="small"
            color="primary"
          >
            Edit Trip
          </Button>
          <Button onClick={handleDelete} size="small" color="primary">
            Delete Trip
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default TourGuideTrip;
