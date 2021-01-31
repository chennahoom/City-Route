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
import TourGuideMenu from "./Pages/TourGuideMenu";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);

  const [searhTripForm, setSearhTripForm] = useState({
    city: "",
    start: "",
    end: "",
  });
  const [userTrips, setUserTrips] = useState([]);
  const [isLogin, setLogin] = useState(false);

  function updateForm(event) {
    const { value, name } = event.target; // event.target -> DOM ELEMENT THAT FIRE EVENT
    setSearhTripForm({ ...searhTripForm, [name]: value });
  }

  const [results, setResults] = useState([]);
  const history = useHistory();

  const setlog = (res) => {
    setLogin(res);
  };

  const updateTrips = (trip) => {
    setUserTrips([...userTrips, trip.id]);
  };

  const addUser = (newUser) => {
    fetch(`https://city-route.herokuapp.com/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((newUser) => {
        console.log(newUser);
        setUser(newUser);
      })
      .catch((err) => console.error(err));
  };

  const addTrip = (newTrip) => {
    fetch(`https://city-route.herokuapp.com/api/trips/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newTrip),
    })
      .then((response) => response.json())
      .then((newTrip) => {
        console.log(newTrip);
        updateTrips(newTrip);
      })
      .catch((err) => console.error(err));
  };

  //   const updateUserTrips = (newTrip) => {
  //     fetch(`https://city-route.herokuapp.com/api/users/${user.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify([newTrip, userTrips]),
  //     }).then((response) => response.json())
  //     .then((newTrip) => {
  //       console.log(newTrip);
  //       console.log(userTrips);
  //       updateTrips(newTrip);
  //     })
  //     .catch((err) => console.error(err));
  // };

  //Here is the USER!!!
  console.log("user", user);

  return (
    <BrowserRouter>
      <div className="App">
        <Header setlog={setlog} setUser={setUser} />
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
              // updateTrips={updateTrips}
            />
          </Route>
          <Route path="/map/:city" exact>
            <MapPage />
          </Route>
          {/* <Route path="/article/:usersId" exact> */}
          <Route path="/article" exact>
            <Article userTrips={userTrips} />
          </Route>
          <Route path="/login" exact>
            <LoginHooks
              setName={setName}
              setEmail={setEmail}
              setUrl={setUrl}
              name={name}
              email={email}
              url={url}
              setlog={setlog}
              setUser={setUser}
            />
          </Route>
          <Route path="/tourGuideMenu" exact>
            <TourGuideMenu
              user={user}
              addTrip={addTrip}
              // updateUserTrips={updateUserTrips}
            />
          </Route>
          {/* <Route path="/addTrip" exact>
            <AddTrip />
          </Route> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
