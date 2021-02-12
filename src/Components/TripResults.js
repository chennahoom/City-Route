import { Link } from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin:15,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

function TripResults(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.trip.trip_name_city}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.trip.tour_date}{bull}{props.trip.tour_time}{bull}{props.trip.start_time}
        </Typography>
        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>

      <CardActions>
        <Link to={`/maps/${props.trip.trip_name_city}?id=${props.trip.id}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
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
