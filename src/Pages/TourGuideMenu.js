import TripForm from "../Components/TripForm";
import TripsList from "../Components/TripsList";

function TourGuideMenu(props) {

  return (
    <div>
      <TripForm
        user={props.user}
        addTrip={props.addTrip}
        updateUserTrips={props.updateUserTrips}
      />
      {/* <TripsList user={props.user} userTrips={props.userTrips}/> */}
      {/* <button onClick={add}>Add Trip</button> */}
      <button>View All Trips</button>
    </div>
  );
}

export default TourGuideMenu;
