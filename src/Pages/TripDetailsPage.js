import TripDetails from '../Components/TripDetails';

import { useParams } from 'react-router-dom';

function TripDetailsPage(props) {
	const params = useParams();
	console.log(params);
	return <TripDetails updateUserTrips={props.updateUserTrips} user={props.user} tripId={params.tripId} updateTrips={props.updateTrips} />;
}

export default TripDetailsPage;
