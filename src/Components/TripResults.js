import { Link } from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  root: {
    width:'100%',
    // height:100,
    // minWidth: 275,
    // margin:15,
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
  // heading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   fontWeight: theme.typography.fontWeightRegular,
  // },
});

function TripResults(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography style={{display:'inline-block'}} className={classes.title} color="textSecondary" gutterBottom>
          {props.trip.trip_name_city}
        </Typography>
        <Typography variant="h5">
          {props.trip.tour_date}{bull}{props.trip.tour_time}{bull}{props.trip.start_time}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        </Typography>
      </AccordionDetails>
    </Accordion>

    // <Card className={classes.root}>
    //   <CardContent>
    //     <Typography className={classes.title} color="textSecondary" gutterBottom>
    //       {props.trip.trip_name_city}
    //     </Typography>
        // <Typography variant="h5" component="h2">
        //   {props.trip.tour_date}{bull}{props.trip.tour_time}{bull}{props.trip.start_time}
        // </Typography>
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
