import TripResults from '../Components/TripResults';
import { useEffect, useState } from 'react';

function ResultsPage(props) {
<<<<<<< HEAD
  const [results, setResults] = useState([]);

  useEffect(() => {
    // run after render

    fetch("https://city-route.herokuapp.com/api/trips")
      .then((res) => res.json())
      .then((body) => {
        setResults(body);
      });
  }, []);

  let filteredTrips = results.filter((item) => {
    const tripDate = stringToDate(item.tour_date);
    const startDate = stringToDate(props.searhTripForm.start);
    const endData = stringToDate(props.searhTripForm.end);

    const validDate =
      tripDate.getTime() <= endData.getTime() &&
      tripDate.getTime() >= startDate.getTime();

    const validCity = props.searhTripForm.city
      ? item.trip_name_city === props.searhTripForm.city
      : true;
    return validDate && validCity;
  });

  return (
    <div>
      <section className="container">
        <h2 className="pageTitle">Where would you like to travel?</h2>
        <section className="row row-cols-1 row-cols-md-3"></section>
        {filteredTrips.map((trip, i) => (
          <TripResults trip={trip} key={i}/>
        ))}
      </section>
    </div>
  );
=======
	const [results, setResults] = useState([]);

	useEffect(() => {
		// run after render

		fetch('https://city-route.herokuapp.com/api/trips')
			.then(res => res.json())
			.then(body => {
				setResults(body);
			});
	}, []);

	console.log('searchTripForm', props.searchTripForm);

	let filteredTrips = results.filter(item => {
		const tripDate = stringToDate(item.tour_date);
		const startDate = stringToDate(props.searchTripForm.start);
		const endData = stringToDate(props.searchTripForm.end);

		const validDate = tripDate.getTime() <= endData.getTime() && tripDate.getTime() >= startDate.getTime();

		const validCity = props.searchTripForm.city ? item.trip_name_city === props.searchTripForm.city : true;
		return validDate && validCity;
	});

	return (
		<div>
			<section className="container">
				<h2 className="pageTitle">Where would you like to travel?</h2>
				<section className="row row-cols-1 row-cols-md-3"></section>
				{filteredTrips.map(trip => (
					<TripResults trip={trip} />
				))}
			</section>
		</div>
	);
>>>>>>> 35c17ec410ecc3842fb492c4f8b0b6d4573d29e3
}

function stringToDate(date) {
	const [day, month, year] = date.split('/');
	const result = new Date(year, month - 1, day);
	return result;
}

export default ResultsPage;
