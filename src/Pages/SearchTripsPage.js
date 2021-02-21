import { Grid, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import SearchTripForm from "../Components/SearchTripForm";
import Trip from "../Components/Trip";

let trips = [
  { name: "Berlin", image: "https://i.postimg.cc/d3td1fFv/image.jpg" },
  { name: "London", image: "https://i.postimg.cc/85GL85n7/image.jpg" },
];



function SearchTripsPage(props) {
  return (
    // <Container>
    //   <SearchTripForm updateForm={props.updateForm} />

    //   <section className="container">
    //     <h2 id="pageTitle">Where would you like to travel?</h2>

    //     <section className="row row-cols-1 row-cols-md-3">
    //       {trips.map((trip, i) => {
    //         return (
    //           <section className="col mb-4">
    //             <Trip trip={trip} key={trip.id} />
    //           </section>
    //         );
    //       })}
    //     </section>
    //   </section>
    // </Container>

    // <Grid container className={classes.main_con}>
    //   <Grid item xs={3} className={classes.container}></Grid>
    //   <Grid item xs={9} className={classes.containersecond}></Grid>
    //   <Grid item ></Grid>
    // </Grid>

    <div></div>
  );
}

export default SearchTripsPage;
