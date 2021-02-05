import "./App.css";

import { useState } from "react";

import Header from "./Components/Header";
import SearchTripPage from "./Pages/SearchTripsPage";
import ResultsPage from "./Pages/ResultsPage";
import TripDetailsPage from "./Pages/TripDetailsPage";
import MyTripsPage from "./Pages/MyTripsPage";
import { useHistory } from "react-router-dom";
import Map from "./Components/MapView";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TourGuidePage from "./Pages/TourGuidePage";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  // const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  // const [userTrips, setUserTrips] = ('');

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

  // const [results, setResults] = useState([]);
  const history = useHistory();

  const setlog = (res) => {
    setLogin(res);
  };

  const signUp = (newUser) => {
    if (newUser.type_of_user === "Traveler") {
      history.push("/trips");
    } else {
      history.push("/tourGuideMenu");
    }
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
        signUp(newUser);
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
        console.log(newTrip.id);
        updateUserTrips(newTrip.id);
        // console.log(newTripId);
      })
      .catch((err) => console.error(err));
  };

  const updateUserTrips = (newTrip) => {
    // setMyTrips();
    var newMyTrips = user.my_trips;
    newMyTrips.push(newTrip);
    fetch(`https://city-route.herokuapp.com/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        my_trips: newMyTrips,
      }),
    })
      .then((response) => response.json())
      .then((newTrip) => {
        console.log(newTrip);
        console.log(userTrips);
        // setUserTrips(user.my_trips);
        // updateTrips(newTrip);
      })
      .catch((err) => console.error(err));
  };

  //Here is the USER!!!
  console.log("user", user);

  return (
      <div className="App">
        <Header setlog={setlog} setUser={setUser} />
        <Switch>
          <Route path="/trips" exact>
            <SearchTripPage updateForm={updateForm} />
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
            <TripDetailsPage />
          </Route>
          <Route path="/map/:city" exact>
            <Map />
          </Route>
          {/* <Route path="/article/:usersId" exact> */}
          <Route path="/article" exact>
            <MyTripsPage userTrips={userTrips} />
          </Route>
          <Route path="/login" exact>
            <LoginPage
              setName={setName}
              setEmail={setEmail}
              setUrl={setUrl}
              name={name}
              email={email}
              url={url}
              setlog={setlog}
              setUser={setUser}
              addUser={addUser}
            />
          </Route>
          <Route path="/tourGuideMenu" exact>
            <TourGuidePage
              user={user}
              addTrip={addTrip}
              updateUserTrips={updateUserTrips}
              userTrips={userTrips}
            />
          </Route>
          {/* <Route path="/addTrip" exact>
            <AddTrip />
          </Route> */}
        </Switch>
      </div>
  );
}

export default App;
