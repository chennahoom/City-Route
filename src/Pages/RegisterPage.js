import { GoogleLogin } from "react-google-login";



import { useEffect, useState } from "react";

function RegisterPage() {


  
  const [results, setResults] = useState([]);

  useEffect(() => {
    // run after render
    fetch(`https://city-route.herokuapp.com/api/users`)
      .then((res) => res.json())
      .then((body) => {
        setResults(body);
      });
  }, []);

  const responseGoogle = (response) => {
    for (let i = 0; i < results.length; i++) {
      if (response.profileObj.email === results[i].email)
        console.log(results[i].email);
      else {
      }
    }

    // console.log(response);
    // console.log(response.profileObj);

    // console.log(response.profileObj.email);
    // console.log(response.profileObj.givenName);
  };


  return (
      <GoogleLogin
        clientId="233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />

  );
}

export default RegisterPage;
