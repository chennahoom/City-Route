import { useEffect, useState } from 'react';
import Map from '../Components/Map';

function TourGuideTrip(props) {
	const [tripData, setTripData] = useState(props.data);

	console.log('props.editTrip', props.editTrip);
	useEffect(() => {
	console.log('props.useEffect', props.editTrip);
		fetch(`https://city-route.herokuapp.com/api/trips/${props.data}`)
			.then(res => res.json())
			.then(body => {
				if (body) {
					setTripData(body);
				}
				console.log(body);
				console.log(props.data);
			});
	}, [props.editTrip]);

	const handleDelete = () => {
		console.log(props.data);
		props.deleteTrip(props.data);
	};

	return (
		<div>
			<div>
				<div></div>{' '}
			</div>
			<ul>
				{/* <li>trip id: {tripData.id}</li> */}
				<li>tickets bought: {tripData?.ticketsBought}</li>
				<li>start time: {tripData?.start_time}</li>
				<li>trip name city: {tripData?.trip_name_city}</li>
				<li>tour date: {tripData?.tour_date}</li>
				<li>tour time: {tripData?.tour_time}</li>
				<button onClick={() => props.onDuplicate(tripData)}>Duplicate</button>
				<button onClick={() => props.setEditTrip(tripData)}>Edit</button>
				<button onClick={handleDelete}>Delete</button>
			</ul>
		</div>
	);
}

export default TourGuideTrip;
