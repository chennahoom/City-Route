import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Register from "./SignUp";


function LoginPage(props) {
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

  // const onSuccess = (res) => {
  //   props.setName(res.profileObj.name);
  //   props.setEmail(res.profileObj.email);
  //   props.setUrl(res.profileObj.imageUrl);
  //   refreshTokenSetup(res);
  //   props.setlog(true);
  //   fetch(`https://city-route.herokuapp.com/api/users/email`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: res.profileObj.email,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((user) => {
  //       if (!user) {
  //         return history.push(
  //           `/register?email=${res.profileObj.email}&name=${res.profileObj.name}`
  //         );
  //       }
  //       props.setUser(user);

  //       console.log(user.type_of_user);

  //       if (user.type_of_user === "Traveler") {
  //         history.push("/trips");
  //       } else {
  //         history.push("/tourGuideMenu");
  //       }
  //       console.log(user.type_of_user);
  //       console.log(user);
  //     });
  //   // getAllUsers();

  //   //findUserByEmail(res.profileObj.email);
  // };



  return (
    <div>
      <button onClick={props.signIn} className="button">
        <img src="icons/google.svg" alt="google login" className="icon"></img>
        <span className="buttonText">Sign in with Google</span>
      </button>

      <Register addUser={props.addUser}>
          
      </Register>
    </div>

    );
}

export default LoginPage;