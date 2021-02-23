import TripDetails from "./TripDetails";

function TripDetailsPage(props) {
  return (
    <TripDetails
      serverUpdateUserTrips={props.serverUpdateUserTrips}
      lowPriceTrips={props.lowPriceTrips}
      user={props.user}
      city={props.city}
      tripId={props.tripId}
      {...props}
    />
  );
}

export default TripDetailsPage;
