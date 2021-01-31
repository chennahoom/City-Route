import { useHistory } from "react-router-dom";
import TripForm from "../Components/TripForm";
import TripsList from "../Components/TripsList";

function TourGuideMenu(props) {
  const history = useHistory();
//   console.log(props.user.id);

  const add = () => {
    history.push("/addTrip");
  };

  return (
    <div>
      <TripForm
        user={props.user}
        addTrip={props.addTrip}
        updateUserTrips={props.updateUserTrips}
      />
      {/* <button onClick={add}>Add Trip</button> */}
      <button>View All Trips</button>
    </div>
  );
}

export default TourGuideMenu;
