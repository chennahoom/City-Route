import "./App.css";

import { useState } from "react";

import Header from "./Components/Header";
import TripsPage from "./Pages/TripsPage";
import ResultsPage from "./Pages/ResultsPage";
import HomePage from "./Pages/HomePage";
import MapPage from "./Pages/MapPage";
import Article from "./Pages/Article";
import RegisterPage from "./Pages/RegisterPage";
import Register from "./Pages/Register";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [searhTripForm, setSearhTripForm] = useState({
    city: "",
    start: "",
    end: "",
  });
  const [userTrips, setUserTrips] = useState([]);

  function updateForm(event) {
    console.log("updateForm", event.target.name, event.target.value);

    //const value = event.target.value;
    //const name = event.target.name;
    const { value, name } = event.target; // event.target -> DOM ELEMENT THAT FIRE EVENT

    setSearhTripForm({ ...searhTripForm, [name]: value });
  }

  const updateTrips = (trip) => {
    setUserTrips([...userTrips, trip]);
    console.log(userTrips);
  };

  const addUser = (user) => {
    fetch(`https://city-route.herokuapp.com/api/users/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
    .then(response => response.json())
    .then(user => { 
      console.log(user);
    })
  }


  console.log("searhTripForm", searhTripForm);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/trips" exact>
            <TripsPage updateForm={updateForm} />
          </Route>
          <Route path="/registerNew" exact>
            <Register addUser={addUser}/>
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
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
