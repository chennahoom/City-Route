import AddTripForm from "../Components/TripFormTG";
import TripsList from "../Components/TripsList";


function TourGuidePage(props) {
  return (
    <div>
      <AddTripForm
        user={props.user}
        addTrip={props.addTrip}
        updateUserTrips={props.updateUserTrips}
      />
      <TripsList user={props.user} userTrips={props.userTrips}/>
      <button>View All Trips</button>
    </div>
  );
}

export default TourGuidePage;
