import { useHistory, useParams, useLocation } from 'react-router-dom';
import MapView from './MapView';
import MapPage from '../Pages/MapPage';

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
	const history = useHistory();
	const classes = useStyles();
	// const [open, setOpen] = React.useState(false);
	const [results, setResults] = useState([]);
	const [tourGuide, setTourGuide] = useState([]);
	const [tickets, setTickets] = useState({});
	const [stops, setStops] = useState([]);
	const [trip, setTrip] = useState('');
	const [open, setOpen] = useState(false);
	const [openInfoModal, setOpenInfoModal] = useState(false);

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
				console.log(body.tickets_bought);
				let i = body.tickets_bought + 2;
				console.log(i);
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
		console.log(info);
		fetch(`https://city-route.herokuapp.com/api/trips/${tripId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				ticketsBought: 1,
			}),
		})
			.then(response => response.json())
			.then(info => {
				console.log(tripId);
				console.log(info.ticketsBought);
				setTrip(info);
				// props.updateTrips(info);
			});
	};

	const numOfTic = () => {
		//MyTripsPage
		const info = parseInt(results.ticketsBought) + parseInt(tickets);
		if (info > 10) {
			updateSpace(info);
			props.serverUpdateUserTrips(tripId);
		} else {
			handleClose();
			if (props.lowPriceTrips.length) {
				setOpenInfoModal(true);
			} else {
				history.push('/saleTrips');
			}
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
	console.log('tripDetaeils', results);

	return (
		<div className="card-map">
			<div>
				<MapPage trip={trip} stops={stops} />
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
					Tickets bought: {results.ticketsBought}
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
				}}>
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

			{/* info modal */}
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openInfoModal}
				onClose={() => setOpenInfoModal(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={openInfoModal}>
					<div className={classes.paper}>
						<h2>How many spaces do you want to save?</h2>
						<div>
							{props.lowPriceTrips.map(trip => {
								return (
									<div key={trip.id}>
										<span>{trip.trip_name_city}</span>
										<span>{trip.ticketsBought}</span>
									</div>
								);
							})}
						</div>

						<button
							onClick={() => {
								setOpenInfoModal(false);
								history.push('/saleTrips');
							}}
							type="button"
							className="btn btn-primary"
							id="save-tickets">
							next
						</button>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default TripDetails;
