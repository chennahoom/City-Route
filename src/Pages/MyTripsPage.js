import { useParams } from 'react-router-dom';
import TripResults from '../Components/TripResults';

function MyTripsPage(props) {
	console.log('USER', props.user?.my_trips);
	return (
		<div>
			<h2 id="pageTitle">My Trips</h2>

			<section className="row row-cols-1 row-cols-md-3" id="All-trips">
				{props.userTrips}
			</section>
		</div>
	);
}

export default MyTripsPage;

//article where all travelers trips are
