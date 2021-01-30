import React from "react";
import {Link} from "react";
import { useState } from "react";
import GoogleLogin, { useGoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "./utils/refreshToken";

const clientId =
  "233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com";

function GoogleLogIn(props) {
  
  // const responseGoogle = (res) => {
  //   props.setName(res.profileObj.name);
  //   props.setEmail(res.profileObj.email);
  //   props.setUrl(res.profileObj.imageUrl);
  // };

  const onSuccess = (res) => {
    props.setName(res.profileObj.name);
    props.setEmail(res.profileObj.email);
    props.setUrl(res.profileObj.imageUrl);

    console.log("Login Success: currentUser:", res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.email} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
    <Link to="/trips"></Link>
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <div>
      <h2>Welcome: {props.name} </h2>
      <h2>Email: {props.email}</h2>
      <img src={props.url} alt={props.name} />
      <button onClick={signIn} className="button">
        <img src="icons/google.svg" alt="google login" className="icon"></img>

        <span className="buttonText">Sign in with Google</span>
      </button>
    </div>
  );
}

export default GoogleLogIn;
