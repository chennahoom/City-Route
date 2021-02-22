import React from "react";
import { useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const clientId =
  "233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com";

function Logout(props) {
  const classes = useStyles();

  const history = useHistory();
  const onLogoutSuccess = (res) => {
    localStorage.removeItem("userId");
    props.setlog(false);
    history.push("/signUp");
    props.setUser(null);
    console.log("signedout");
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    onLogoutSuccess,
    clientId,
    onFailure,
  });

  return (
    // <button onClick={signOut} id="logoutbutton" className="button">
    //   Sign Out
    // </button>
    <div className={classes.root}>
      <Button onClick={signOut} variant="contained" color="primary" href="#contained-buttons">
        Sign Out
      </Button>
    </div>
  );
}

export default Logout;
