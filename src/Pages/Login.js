import React from "react";
import { useState } from "react";
import  { useGoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../Components/utils/refreshToken";
import { useHistory } from "react-router-dom";

const clientId =
  "233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com";

function GoogleLogIn(props) {
  const history = useHistory();
  const [results, setResults] = useState([]);

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


        if (user.type_of_user === "Traveler") {
          history.push("/trips");
        } else {
          history.push("/tourGuideMenu");
        }

      });
  };
  const onFailure = (res) => {
    alert(`Failed to login, res:`, res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
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