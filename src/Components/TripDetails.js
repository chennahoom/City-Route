import { useHistory, useParams, useLocation } from 'react-router-dom';
import MapView from './MapView';
import Modal from '@material-ui/core/Modal';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Api from '../Api';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function TripDetails(props) {
	const history = useHistory()
	const classes = useStyles();
	// const [open, setOpen] = React.useState(false);
	const [results, setResults] = useState([]);
	const [tourGuide, setTourGuide] = useState([]);
	const [tickets, setTickets] = useState({});
	const [stops, setStops] = useState([]);
	const [trip, setTrip] = useState('');
	const [open, setOpen] = useState(false);

	const { city } = useParams();
	const location = useLocation();

	const query = new URLSearchParams(location.search);

	const tripId = query.get('id');

	useEffect(() => {
		// run after render
		fetch(`https://city-route.herokuapp.com/api/trips/${tripId}`)
			.then(res => res.json())
			.then(body => {
				setResults(body);
				tourGuideId(body.tour_guide_id);
				setTrip(tripId);
			});
	}, []);

	useEffect(() => {
		// run after render
		fetch(`https://city-route.herokuapp.com/api/stops/?city=${city}`)
			.then(res => res.json())
			.then(body => {
				console.log(city, body);
				setStops(body);
				console.log(body);
			});
	}, [city]);

	const tourGuideId = id => {
		fetch(`https://city-route.herokuapp.com/api/users/${id}`)
			.then(res => res.json())
			.then(body => {
				setTourGuide(body);
			});
	};

	const updateSpace = info => {
		fetch(`https://city-route.herokuapp.com/api/trips/${tripId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			// body: JSON.stringify(info),
			body: JSON.stringify({
				spaces_left: info,
			}),
		})
			.then(response => response.json())
			.then(info => {
				// props.updateTrips(info);
				console.log(tripId);
				setTrip(info);
				// props.updateTrips(info);
			});
	};

	const numOfTic = () => { //MyTripsPage
		// TODO:need to check id Traveler
		console.log(tickets);
		if (results.spaces_left >= tickets) {
			const info = parseInt(results.spaces_left) - parseInt(tickets);
			updateSpace(info);
			props.serverUpdateUserTrips(tripId)
		} else {
			//TODO: add here the num of the tour guide
		}
	};

	const handleTick = event => {
		setTickets(event.target.value);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="card-map">
			<div id="mapid">
				<MapView trip={trip} stops={stops} />
			</div>
			<div className="card-body">
				<h5 className="card-title" id="tour-city">
					City: {results.trip_name_city}
				</h5>
				<h3 className="card-title" id="tour-guide">
					Tour Guide: {tourGuide.full_name}
				</h3>
				<p className="card-text" id="trip-stops">
					Stops: {stops.map(stop => stop.stop_name)}
				</p>
			</div>

			<ul className="list-group list-group-flush">
				<li className="list-group-item" id="tourDate">
					Tour Date: {results.tour_date}
				</li>
				<li className="list-group-item" id="tourTime">
					Tour Time: {results.tour_time}
				</li>
				<li className="list-group-item" id="startTime">
					Start time: {results.start_time}
				</li>
				<li className="list-group-item" id="spacesLeft">
					Spaces Left: {results.spaces_left}
				</li>
			</ul>

			<Button variant="contained" color="secondary" onClick={handleOpen}>
				Join Trip
      		</Button>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2>How many spaces do you want to save?</h2>
						<p>
							<label for="spaces">Number of Tickets:</label>
							<select id="spaces" onChange={handleTick}>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</p>

						<button type="button" className="btn btn-primary" id="save-tickets" onClick={numOfTic}>
							Save Changes
                  		</button>

					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default TripDetails;
