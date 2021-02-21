import TripResults from '../Components/TripResults';
import { useEffect, useState } from 'react';

function ResultsPage(props) {
	const [results, setResults] = useState([]);
	const [low, setLow] = useState([]);
	// const lowPriceTrips='';

	useEffect(() => {
		// run after render
		console.log(props.searchTripForm.city);

		fetch('https://city-route.herokuapp.com/api/trips')
			.then(res => res.json())
			.then(body => {
				console.log('searchTripForm', props.searchTripForm);

				let filteredTrips = body.filter(item => {
					const tripDate = stringToDate(item.tour_date);
					const startDate = stringToDate(props.searchTripForm.start);
					const endData = stringToDate(props.searchTripForm.end);

					const validDate = tripDate.getTime() <= endData.getTime() && tripDate.getTime() >= startDate.getTime();

					const validCity = props.searchTripForm.city ? item.trip_name_city === props.searchTripForm.city : true;
					return validDate && validCity;
				});

				console.log('filteredTrips', filteredTrips);
				// const lowPriceTrips = filteredTrips.filter(trip => trip.ticketsBought >= 10);
				const lowPriceTrips = filteredTrips.filter(trip => trip.ticketsBought >= 10);
				setLow(lowPriceTrips);

				// console.log('lowPriceTrips', lowPriceTrips);

				setResults(filteredTrips);
				props.setLowPriceTrips(lowPriceTrips);
				// console.log(lowPriceTrips);
			});
	}, []);

	return (
		<div>
			<section className="container">
				<h2 className="pageTitle">Where would you like to travel?</h2>
				<section className="row row-cols-1 row-cols-md-3"></section>
				{results.map((trip, i) => (
					<TripResults serverUpdateUserTrips={props.serverUpdateUserTrips} low={low} trip={trip} key={i} />
				))}
			</section>
		</div>
	);
}

function stringToDate(date) {
	if (!date) return new Date();
	const [day, month, year] = date.split('/');
	const result = new Date(year, month - 1, day);
	return result;
}

export default ResultsPage;
