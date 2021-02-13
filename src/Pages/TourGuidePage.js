import { useState, useEffect } from 'react';
import AddTripForm from '../Components/TripFormTG';
import TripsList from '../Components/TripsList';
import { useHistory } from 'react-router-dom';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

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

function TourGuidePage(props) {
	const [listChanged, setListChanged] = useState(false);
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({});
	const [duplicate, setDuplicate] = useState({});
	const [editTrip, setEditTrip] = useState(null);

	const classes = useStyles();

	const addTrip = newTrip => {
		console.log(newTrip);
		fetch(`https://city-route.herokuapp.com/api/trips/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(newTrip),
		})
			.then(response => response.json())
			.then(newTrip => {
				console.log(newTrip);
				console.log(newTrip.id);
				serverUpdateUserTrips(newTrip.id);
				props.updateUserTrips(newTrip.id);
			})
			.catch(err => console.error(err));
	};

	const serverUpdateUserTrips = newTripId => {
		var newMyTrips = [];
		if (props.user.my_trips) {
			newMyTrips = [...props.user.my_trips];
		}
		newMyTrips.push(newTripId);
		fetch(`https://city-route.herokuapp.com/api/users/${props.user.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				my_trips: newMyTrips,
			}),
		})
			.then(response => response.json())
			.then(newTrip => {
				console.log(newTrip);
			})
			.catch(err => console.error(err));
	};

	function duplicateTrip() {
		console.log('duplicate', duplicate);
		addTrip({ ...duplicate, ...form });
		setOpen(false);
	}

	function onChange(e) {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	}

	console.log('editTrip',editTrip);

	return (
		<div>
			<AddTripForm editTrip={editTrip} user={props.user} addTrip={addTrip} isEditing={props.isEditing} />
			<TripsList
				tourGuideTrips={props.user?.my_trips || []}
				user={props.user}
				setEditTrip={setEditTrip}
				userTrips={props.userTrips}
				deleteTrip={props.deleteTrip}
				setListChanged={setListChanged}
				listChanged={listChanged}
				onDuplicate={trip => {
					setDuplicate(trip);
					setOpen(true);
				}}
			/>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={() => setOpen(false)}
				closeAfterTransition
				BackdropProps={{
					timeout: 500,
				}}>
				<div>
					<div className={classes.paper}>
						<h2>How many spaces do you want to save?</h2>
						<div>form</div>

						<label htmlFor="">date</label>
						<input name="tour_date" type="text" onChange={onChange} />
						<label htmlFor="">time</label>
						<input type="text" name="start_time" onChange={onChange} />
						<br />

						<button onClick={duplicateTrip} type="button" className="btn btn-primary">
							next
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default TourGuidePage;
