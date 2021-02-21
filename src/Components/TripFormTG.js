import { useState, useEffect, useRef } from 'react';
import MapTG from '../Components/MapTourGuide';



function AddTripForm(props) {
	const initForm = {
		trip_name_city: '',
		tour_date: '',
		tour_guide_id: props.user?.id,
		tour_time: '',
		start_time: '',
		ticketsBought: 0,
	};

	const formRef = useRef(null);
	const [trip, setTrip] = useState(props.editTrip || initForm);
	const [stops, setStops] = useState([]);
	const [selectedStops, setSelectedStops] = useState([]);
	// const [marker, setMarker] = useEffect({});

	useEffect(() => {
		if (props.editTrip) {
			setTrip(props.editTrip);
			setSelectedStops(props.editTrip.stops);
		}
	}, [props.editTrip]);

	useEffect(() => {
		async function getStops() {
			if (!trip.trip_name_city) return;
			const res = await fetch(`https://city-route.herokuapp.com/api/stops/?city=${trip.trip_name_city}`);
			const body = await res.json();
			setStops(body);

			if (props.editTrip) {
				setSelectedStops(props.editTrip.stops);
			} else {
				setSelectedStops([]);
			}
		}

		getStops();
	}, [trip.trip_name_city]);

	const handleInputChange = event => {
		const { name, value } = event.target;
		setTrip({ ...trip, [name]: value });
		console.log(trip.id);
	};
	const onSave = event => {
		event.preventDefault();
		console.log(trip);
		if (!trip.trip_name_city || !trip.tour_date || !trip.tour_time || !trip.start_time) return;
		trip.stops = selectedStops;

		if (!editTrip) {
			props.addTrip(trip);
		} else {
			// udate trip
			props.updateTrip(trip, trip.id);
		}
		formRef.current.reset(); // reset form
		setSelectedStops([]);
		setTrip(initForm);
		setStops([]);
	};

	function toggledStop(id) {
		const exists = selectedStops.find(stopId => stopId === id);
		console.log('exists', exists);
		if (exists) {
			setSelectedStops(selectedStops.filter(stopId => stopId !== id));
		} else {
			setSelectedStops([...selectedStops, id]);
		}
	}

	const { editTrip } = props;

	const tour_time = editTrip?.tour_time;
	const tour_date = editTrip?.tour_date;
	const start_time = editTrip?.start_time;
	const mapContainerStyle = {
		width: '300px',
		height: '300px',
		margin: '0 auto',
	};

	return (
		<div>
			<form ref={formRef} onSubmit={onSave}>
				<label>
					City:
					<select value={trip.trip_name_city} name="trip_name_city" onChange={handleInputChange}>
						<option value="">Choose</option>
						<option selected value="Tel-Aviv">
							Tel-Aviv
						</option>
						<option value="Berlin">Berlin</option>
						<option value="London">London</option>
						<option value="Amsterdam">Amsterdam</option>
						<option value="Paris">Paris</option>
					</select>
					<br />
				</label>
				<label>
					Tour-Date:
					<input defaultValue={tour_date} type="text" placeholder="01/06/2021" name="tour_date" onChange={handleInputChange} />
					<br />
				</label>
				<label>
					Tour-Time:
					<input defaultValue={tour_time} type="text" name="tour_time" onChange={handleInputChange} />
					<br />
				</label>
				<label>
					Start-Time:
					<input type="text" defaultValue={start_time} name="start_time" onChange={handleInputChange} />
					<br />
				</label>
				<br />
				{stops.map(stop => {
					return (
						<div key={stop.id}>
							{stop.stop_name}
							<input type="checkbox" checked={selectedStops.includes(stop.id)} onChange={() => toggledStop(stop.id)} />
						</div>
					);
				})}

				<button onClick={onSave}>{props.editTrip ? 'Save' : 'Add'}</button>
			</form>
			<MapTG stops={stops} trip={trip} selectedStops={selectedStops} />
		</div>
	);
}
export default AddTripForm;
