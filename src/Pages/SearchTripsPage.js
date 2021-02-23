import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchTripForm from "../Components/SearchTripForm";
import Amsterdam from "../static/amsterdam4.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  background: {
    backgroundImage: `url(${Amsterdam})`,
    height: 800,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    left: 0,
    right: 0,
  },
}));

function SearchTripsPage(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item className={classes.background}></Grid>
      <SearchTripForm updateForm={props.updateForm} />
    </Grid>
  );
}

export default SearchTripsPage;
