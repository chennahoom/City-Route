import { useState } from "react";
import AddTripForm from "../Components/TripFormTG";
import TripsList from "../Components/TripsList";
import { useHistory } from "react-router-dom";



function TourGuidePage(props) {
  const history = useHistory();
  const [listChanged, setListChanged] = useState(false);
  

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
      })
      .catch((err) => console.error(err));
  };

  const updateUserTrips = (newTripId) => {
    var newMyTrips = props.user.my_trips;
    newMyTrips.push(newTripId);
    fetch(`https://city-route.herokuapp.com/api/users/${props.user.id}`, {
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
      })
      .catch((err) => console.error(err));
  };


  return (
    <div>
      <AddTripForm
        user={props.user}
        addTrip={addTrip}

        updateUserTrips={props.updateUserTrips}
      />
      <TripsList  user={props.user} userTrips={props.userTrips} setListChanged={setListChanged} listChanged={listChanged}/>
      <button>View All Trips</button>
    </div>
  );
}

export default TourGuidePage;
