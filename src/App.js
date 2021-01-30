import "./App.css";

import { useState, useEffect, Link } from "react";

import Header from "./Components/Header";
import TripsPage from "./Pages/TripsPage";
import ResultsPage from "./Pages/ResultsPage";
import HomePage from "./Pages/HomePage";
import MapPage from "./Pages/MapPage";
import Article from "./Pages/Article";
import { useHistory } from "react-router-dom";

import LoginHooks from "./Pages/LoginHooks";
import LogoutHooks from "./Components/LogoutHooks";
import Register from "./Pages/Register";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const [searhTripForm, setSearhTripForm] = useState({
    city: "",
    start: "",
    end: "",
  });
  const [userTrips, setUserTrips] = useState([]);
  const [isLogin, setLogin] = useState(false);

  function updateForm(event) {
    console.log("updateForm", event.target.name, event.target.value);

    //const value = event.target.value;
    //const name = event.target.name;
    const { value, name } = event.target; // event.target -> DOM ELEMENT THAT FIRE EVENT

    setSearhTripForm({ ...searhTripForm, [name]: value });
  }

  const [results, setResults] = useState([]);
  const history = useHistory();

  // useEffect(() => {
  //   // run after render
  //   fetch(`https://city-route.herokuapp.com/api/users`)
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setResults(body);
  //     });
  // }, []);

  const checkEmail = (email) => {
    fetch(`https://city-route.herokuapp.com/api/users`)
      .then((res) => res.json())
      .then((body) => {
        setResults(body);
        // check(email);
      });
    console.log(email);
    check(email);
  };

  const check = (email) => {
    console.log("ffff");
    // results.map(item =>{
    //   console.log("i, in");
    //   if(email===item.email){
    //     console.log("gggg");

    //     <Redirect to='/trips' />
    //   }
    //   else{
    //     console.log("gggg");
    //     <Redirect to='/register' />
    //   }
    // })
    // console.log("ffff");

    for (let i = 0; i < results.length; i++) {
      //if the user is already register
      console.log("didnt found");

      if (email === results[i].email) {
        console.log(results[i].email);
        <Redirect to="/trips" />;
      } else {
        console.log("didnt found");
        <Redirect to="/register" />;
      }
    }
  };

  const setlog = (res) => {
    setLogin(res);
  };

  const updateTrips = (trip) => {
    setUserTrips([...userTrips, trip]);
  };

  const addUser = (newUser) => {
    fetch(`https://city-route.herokuapp.com/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // body: JSON.stringify(user),
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err))
      .then((newUser) => {
        console.log(newUser);
      });
  };

  // console.log("searhTripForm", searhTripForm);

  return (
    <BrowserRouter>
      <div className="App">
        <Header setlog={setlog} />
        <Switch>
          <Route path="/trips" exact>
            <TripsPage updateForm={updateForm} />
          </Route>
          <Route path="/register" exact>
            <Register addUser={addUser} />
          </Route>
          <Route path="/results" exact>
            <ResultsPage
              searhTripForm={searhTripForm}
              updateTrips={updateTrips}
            />
          </Route>
          <Route path="/map/:tripId" exact>
            <MapPage />
          </Route>
          {/* <Route path="/article/:usersId" exact> */}
          <Route path="/article" exact>
            <Article userTrips={userTrips} />
          </Route>
          {/* <Route path="/login" exact>
            {isLogin? <Redirect to="/trips"/> : <LoginHooks checkEmail={checkEmail} setName={setName} setEmail={setEmail} setUrl={setUrl} name={name} email={email} url={url} setlog={setlog} />}
          </Route> */}
          <Route path="/login" exact>
            <LoginHooks
              checkEmail={checkEmail}
              setName={setName}
              setEmail={setEmail}
              setUrl={setUrl}
              name={name}
              email={email}
              url={url}
              setlog={setlog}
            />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
