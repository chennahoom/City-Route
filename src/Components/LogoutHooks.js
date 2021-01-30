import React from "react";
import { Link } from "react-router-dom";

import { useGoogleLogout } from "react-google-login";

const clientId =
  '233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com';

function LogoutHooks() {
  const onLogoutSuccess = (res) => {
    console.log("Logged out Success");
    alert("Logged out Successfully ✌");
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <Link to="/login" >
    <button onClick={signOut} className="button">Sign Out
    </button>
    </Link>

  );
}

export default LogoutHooks;
