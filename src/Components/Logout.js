import React from "react";
import { useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";

const clientId =
  "233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com";

function Logout(props) {
  const history = useHistory();
  const onLogoutSuccess = (res) => {
    localStorage.removeItem('userId')
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
    <button onClick={signOut} className="button">
      Sign Out
    </button>
  );
}

export default Logout;