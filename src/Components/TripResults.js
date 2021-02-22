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
    margin: 15,
    width: "45%",
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

  // heading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   flexBasis: '33.33%',
  //   flexShrink: 0,
  // },
  // secondaryHeading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   color: theme.palette.text.secondary,
  // },
  // bullet: {
  //   display: 'inline-block',
  //   margin: '0 2px',
  //   transform: 'scale(0.8)',
  // },
  // pos: {
  //   marginBottom: 12,
  // },
  // acco: {
  //   display:'inline',
}));

function TripResults(props) {
  // const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

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

  const handleStops = () =>{
    console.log(props.trip.stops);
    props.setShowStops(true);
    props.setStops(props.trip.stops);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // src={Berlin}
          image={img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.trip.tour_date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            trip name: {props.trip.trip_name_city}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleStops} size="small" color="primary">
          Stops
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    //  </Grid>
    /* <Grid item xs>
        <Paper>
        <Typography>
          <TripDetails serverUpdateUserTrips={props.serverUpdateUserTrips} user={props.user} lowPriceTrips={props.low} tripId={props.trip.id} city={props.trip.trip_name_city} />
        </Typography>
        </Paper>
      </Grid> */

    // <Grid container>
    //   <Grid item xs={6}>
    //     <Card className={classes.root}>
    //       <CardContent>
    //         <Typography className={classes.title} color="textSecondary" gutterBottom>
    //           {props.trip.trip_name_city}
    //         </Typography>
    //         <Typography variant="h5" component="h2">
    //           {props.trip.tour_date}{bull}{props.trip.tour_time}{bull}{props.trip.start_time}
    //         </Typography>
    //       </CardContent>

    //       <CardActions>
    //         <Link to={`/maps/${props.trip.trip_name_city}?id=${props.trip.id}`}>
    //           <Button size="small">Learn More</Button>
    //         </Link>
    //       </CardActions>
    //     </Card>
    //   </Grid>

    //   <Grid item xs={3}>
    //     Here the map
    //     </Grid>
    // </Grid>
    // <Accordion className={classes.root}>
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="panel1a-content"
    //     id="panel1a-header"
    //   >
    //     <Typography className={classes.heading}>{props.trip.trip_name_city}</Typography>
    //     <Typography className={classes.secondaryHeading}>{props.trip.tour_date}{bull}{props.trip.tour_time}{bull}{props.trip.start_time}</Typography>

    //   </AccordionSummary>
    //   <AccordionDetails className={classes.acco}>
    // <Typography>
    //   <TripDetails serverUpdateUserTrips={props.serverUpdateUserTrips} user={props.user} lowPriceTrips={props.low} tripId={props.trip.id} city={props.trip.trip_name_city} />
    // </Typography>
    //   </AccordionDetails>
    // </Accordion>

    // <Card className={classes.root}>
    //   <CardContent>
    //     <Typography className={classes.title} color="textSecondary" gutterBottom>
    //       {props.trip.trip_name_city}
    //     </Typography>
    //     <Typography variant="h5" component="h2">
    //       {props.trip.tour_date}{bull}{props.trip.tour_time}{bull}{props.trip.start_time}
    //     </Typography>
    //   </CardContent>

    //   <CardActions>
    //     <Link to={`/maps/${props.trip.trip_name_city}?id=${props.trip.id}`}>
    //       <Button size="small">Learn More</Button>
    //     </Link>
    //   </CardActions>
    // </Card>
  );
}

export default TripResults;

// function TripResults(props) {

//   return (
//     <section className="row row-cols-1 row-cols-md-3" id="All-trips">
//       <section className="col mb-4">
//         <div className="card bg-light text-dark">
//           <div className="card-body">
//             <h5 className="card-title">{props.trip.tour_date}</h5>
//             <p className="card-text">{props.trip.stops} </p>
//             <p className="card-text">
//               tour ID: {props.trip.id}
//               <br />
//               tour guide: {props.trip.tour_guide_id}
//               <br />
//               trip name city: {props.trip.trip_name_city}
//               <br />
//               tour time: {props.trip.tour_time}
//               <br />
//               start time: {props.trip.start_time}
//               <br />
//               spaces left: {props.trip.ticketsBought}
//               <br />
//             </p>
//             <Link to={`/maps/${props.trip.trip_name_city}?id=${props.trip.id}`}>
//               <button className="join-trip" id={props.trip.id}>
//                 Join Trip
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// }

// export default TripResults;
