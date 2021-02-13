import TripDetails from '../Components/TripDetails';

import { useParams } from 'react-router-dom';

function TripDetailsPage(props) {
	const params = useParams();
	console.log(params);
	const query = new URLSearchParams(window.location.search);
	const tripId = query.get('id');
	return <TripDetails city={params.city} tripId={tripId} {...props} />;
}

export default TripDetailsPage;
