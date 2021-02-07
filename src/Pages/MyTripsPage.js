import { useParams } from 'react-router-dom';
import MyTrips from '../Components/MyTrips';

function MyTripsPage(props) {
	console.log('USER', props.user?.my_trips);
	return (
		<div>
			<h2 id="pageTitle">My Trips</h2>
			{props.user?.my_trips.map((tripId, i) =>(
				<MyTrips key={i} data={tripId} />
			))}
		</div>
	);
}

export default MyTripsPage;