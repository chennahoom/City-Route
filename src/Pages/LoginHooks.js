import React, { useEffect } from "react";
import { Link } from "react";
import { useState } from "react";
import GoogleLogin, { useGoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../Components/utils/refreshToken";
import { useHistory } from "react-router-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const clientId =
  "233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com";

function GoogleLogIn(props) {
  const history = useHistory();
  const [results, setResults] = useState([]);

  // useEffect(() =>{
  //   fetch(`https://city-route.herokuapp.com/api/users`)
  //   .then((res) => res.json())
  //   .then((body) => {
  //     setResults(body);
  //     // console.log(results);
  //   });
  // });

  const onSuccess = (res) => {
    props.setName(res.profileObj.name);
    props.setEmail(res.profileObj.email);
    props.setUrl(res.profileObj.imageUrl);
    refreshTokenSetup(res);
    props.setlog(true);
    fetch(`https://city-route.herokuapp.com/api/users/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: res.profileObj.email,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user) {
          return history.push(
            `/register?email=${res.profileObj.email}&name=${res.profileObj.name}`
          );
        }
        props.setUser(user);

        console.log(user.type_of_user);

        if (user.type_of_user === "Traveler") {
          history.push("/trips");
        } else {
          history.push("/tourGuideMenu");
        }
        console.log(user.type_of_user);
        console.log(user);
      });
    // getAllUsers();

    //findUserByEmail(res.profileObj.email);
  };

  const findUserByEmail = (email) => {
    let j = 0;
    for (let i = 0; i < results.length; i++) {
      if (email === results[i].email) {
        history.push("/trips");
        j++;
      }
    }

    if (j === 0) {
      history.push("/register");
    }
  };

  const onFailure = (res) => {
    alert(`Failed to login 😢, res:`, res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <div>
      <button onClick={signIn} className="button">
        <img src="icons/google.svg" alt="google login" className="icon"></img>
        <span className="buttonText">Sign in with Google</span>
      </button>
    </div>
  );
}

export default GoogleLogIn;
