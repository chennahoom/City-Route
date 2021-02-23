import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import Berlin from "../static/Berlin1.jpg";
import Amsterdam from "../static/Amsterdam.jpg";
import TelAviv from "../static/Tel-Aviv.jpg";
import Paris from "../static/Paris6.jpg";
import London from "../static/London.jpg";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: '200px',
    margin: '15px',
  },
  media: {
    height: 200,
  },
});

function MyTrips(props) {
  const [tripData, setTripData] = useState("");
  const classes = useStyles();
  useEffect(() => {
    fetch(`https://city-route.herokuapp.com/api/trips/${props.data}`)
      .then((res) => res.json())
      .then((body) => {
        setTripData(body);
      });
  }, []);

  let images = {
    "Tel-Aviv": { src: TelAviv },
    Berlin: { src: Berlin },
    Amsterdam: { src: Amsterdam },
    Paris: { src: Paris },
    London: { src: London },
  };

  let city = tripData?.trip_name_city;
  let img = images[city]?.src;

  return (
    <Grid item xs={12} md={4} sm={6}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={img}
            title="City Gallery"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {tripData?.trip_name_city}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Date: {tripData?.tour_date}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Start Time: {tripData?.start_time}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Trip Duration: {tripData?.tour_time}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    </Grid>
  );
}

export default MyTrips;
