import { Grid, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import SearchTripForm from "../Components/SearchTripForm";
import Trip from "../Components/Trip";
// import Amsterdam from '../static/';
import Amsterdam from '../static/amsterdam4.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  background:{
    backgroundImage: `url(${Amsterdam})`,
    height:800,
    // position:'absolute',
    width:'100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    left:0,
    right:0,
  },
}));

let trips = [
  { name: "Berlin", image: "https://i.postimg.cc/d3td1fFv/image.jpg" },
  { name: "London", image: "https://i.postimg.cc/85GL85n7/image.jpg" },
];



function SearchTripsPage(props) {
  const classes = useStyles();

  return (
      <Grid container spacing={3}>
        <Grid item className={classes.background} ></Grid>
        <SearchTripForm updateForm={props.updateForm} />

        {/* <section className="container">
          <h2 id="pageTitle">Where would you like to travel?</h2>

          <section className="row row-cols-1 row-cols-md-3">
            {trips.map((trip, i) => {
              return (
                <section className="col mb-4">
                  <Trip trip={trip} key={trip.id} />
                </section>
              );
            })}
          </section>
        </section> */}
      </Grid>


  );
}

export default SearchTripsPage;
