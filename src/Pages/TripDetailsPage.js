import TripDetails from "../Components/TripDetails";

import { useParams } from "react-router-dom";

function TripDetailsPage(props) {
  const params = useParams();
  console.log(params);
  return <TripDetails tripId={params.tripId} updateTrips={props.updateTrips} />;
}

export default TripDetailsPage;