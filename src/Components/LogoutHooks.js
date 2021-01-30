import React from "react";
import { Link ,Redirect} from "react-router-dom";
import { refreshTokenSetup } from "./utils/refreshToken";
import { useGoogleLogout } from "react-google-login";
import LoginHooks from "../Pages/LoginHooks";
import { useHistory } from "react-router-dom";


const clientId =
  '233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com';

function LogoutHooks(props) {
  const history = useHistory();
  const onLogoutSuccess = (res) => {
    props.setlog(false)
    history.push("/login");
    console.log("signedout")
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
    <button onClick={signOut} className="button">Sign Out</button>
  );
}

export default LogoutHooks;
