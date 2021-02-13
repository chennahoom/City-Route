import { useHistory, useParams, useLocation } from 'react-router-dom';
import Map from './Map';
import Modal from '@material-ui/core/Modal';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

	const { tripId } = props;
	console.log('tripId', tripId);

	useEffect(() => {
		// run after render
		fetch(`https://city-route.herokuapp.com/api/trips/${tripId}`)
			.then(res => res.json())
			.then(body => {
				setResults(body);
				console.log('body', body);
				tourGuideId(body.tour_guide_id);
				console.log(body.tickets_bought);
				let i = body.tickets_bought + 2;
				console.log(i);
				setTrip(tripId);
			});
	}, [tripId]);

	useEffect(() => {
		// run after render
		fetch(`https://city-route.herokuapp.com/api/stops/?city=${city}`)
			.then(res => res.json())
			.then(body => {
				console.log(city, body);
				console.log('props', props);
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
				ticketsBought: info,
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

	const saleTrip = () => {
		if (props.lowPriceTrips.length) {
			setOpenInfoModal(true);
		} else {
			// history.push('/saleTrips');
			setOpenInfoModal(false);
			setOpen(true);
		}
	};

	const numOfTic = () => {
		const info = parseInt(results.ticketsBought) + parseInt(tickets);
		updateSpace(info);
		props.serverUpdateUserTrips(tripId);
	};

	const handleTick = event => {
		event.preventDefault();
		setTickets(event.target.value);
		console.log(tickets);
	};

	const handleClose = () => {
		setOpen(false);
	};
	console.log('tripDetaeils', results);
	const filteredStops = stops.filter(stop => results?.stops?.includes(stop.id));


	return (
		<div className="card-map">
			<div>
				<Map trip={trip} stops={filteredStops} />
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

			<Button variant="contained" color="secondary" onClick={saleTrip}>
				Join Trip
			</Button>

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
										<span>
											{trip.trip_name_city} + {trip.id} + {trip.ticketsBought}
										</span>
										<button
											onClick={() => {
												setOpenInfoModal(false)
												history.push(`/maps/${trip.trip_name_city}?id=${trip.id}`);
											}}>
											Get info
										</button>
									</div>
								);
							})}
						</div>

						<button
							onClick={() => {
								setOpenInfoModal(false);
								setOpen(true);
								// numOfTic();
							}}>
							Current trip
						</button>
					</div>
				</Fade>
			</Modal>

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
						<FormControl width='10px' variant="filled" className={classes.formControl}>
							<InputLabel id="tick" >Num of Tickets:</InputLabel>
							<Select
							
								labelId="tick"
								id="demo-simple-select-filled"
								value={tickets}
								onChange={handleTick}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value="1">1</MenuItem>
								<MenuItem value="2">2</MenuItem>
								<MenuItem value="3">3</MenuItem>
							</Select>
						</FormControl>

						<Button variant="contained" color="secondary" onClick={numOfTic}>
							Join Trip
						</Button>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default TripDetails;
