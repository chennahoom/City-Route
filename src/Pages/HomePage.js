import Trip from "../Components/Trip";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import HeaderLanding from "../Components/HeaderLanding";
import Register from "./SignUp";
import SignUp from "./SignUp";


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg10.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

function HomePage(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderLanding />
      <SignUp serverError={props.serverError} addUser={props.addUser} signIn={props.signIn} />
    </div>
  );
}

export default HomePage;
