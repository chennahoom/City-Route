import './App.css';
import { useState, useEffect } from 'react';
import Header from './Components/Header';
import SearchTripPage from './Pages/SearchTripsPage';
import ResultsPage from './Pages/ResultsPage';
import TripDetails from './Pages/TripDetails';
import MyTripsPage from './Pages/MyTripsPage';
import { useHistory } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import TourGuidePage from './Pages/TourGuidePage';
import Map from './Components/Map';
import { Switch, Route } from 'react-router-dom';
import GoogleLogin, { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './Components/utils/refreshToken';

//GOOGLE MAPS/PLACES
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const libraries = ['places'];

const clientId = '233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com';

function App() {
	const [user, setUser] = useState(null);
	const [serverError, setServerError] = useState(null);
	const [searchTripForm, setSearchTripForm] = useState({
		city: '',
		start: '',
		end: '',
	});
	const [userTrips, setUserTrips] = useState([]);
	const [lowPriceTrips, setLowPriceTrips] = useState([]);
	const [isLogin, setLogin] = useState(false);

	function updateForm(event) {
		const { value, name } = event.target;
		setSearchTripForm({ ...searchTripForm, [name]: value });
	}

	const history = useHistory();

	const setlog = res => {
		setLogin(res);
	};

	const addUser = async newUser => {
		try {
			const response = await fetch(`https://city-route.herokuapp.com/api/users/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(newUser),
			});
			const data = await response.json();
			if (response.ok) {
				localStorage.setItem('userId', data.id);
				setUser({ ...newUser, id: +data.id });
				setServerError(null);
				if (newUser.type_of_user === 'Traveler') {
					history.push('/trips');
				} else {
					history.push('/tourGuideMenu');
				}
			} else {
				// window.location.reload(false);
				setServerError(data.message);
			}
		} catch (err) {}
	};

	const onSuccess = res => {
		// setName(res.profileObj.name);
		// setEmail(res.profileObj.email);
		// setUrl(res.profileObj.imageUrl);
		console.log('onSuccess', res);
		refreshTokenSetup(res);
		setlog(true);
		fetch(`https://city-route.herokuapp.com/api/users/email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: res.profileObj.email,
			}),
		})
			.then(res => res.json())
			.then(user => {
				if (!user) {
					return history.push('/signUp');
				}
				setUser(user);

				console.log(user.type_of_user);

				const userId = localStorage.getItem('userId');
				console.log('userId', userId);

				localStorage.setItem('userId', user.id);

				if (!userId) {
					// login
					if (user.type_of_user === 'Traveler') {
						history.push('/trips');
					} else {
						history.push('/tourGuideMenu');
					}
				} else {
					// refresh only
				}
				console.log(user.type_of_user);
				console.log(user);
			});

	};

	const onFailure = res => {
		alert(`Failed to login 😢, res:`, res);
	};

	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: true,
		accessType: 'offline',
		// responseType: 'code',
		// prompt: 'consent',
	});

	const addTrip = newTrip => {
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
				updateUserTrips(newTrip.id);
			})
			.catch(err => console.error(err));
	};

	//  add
	const updateUserTrips = newTripId => {
		let newMyTrips = [...(user.my_trips || [])];
		newMyTrips.push(newTripId);
		setUser({ ...user, my_trips: newMyTrips });
	};

	const serverUpdateUserTrips = newTripId => {
		var newMyTrips = [...(user.my_trips || [])];
		newMyTrips.push(newTripId);
		fetch(`https://city-route.herokuapp.com/api/users/${user?.id}`, {
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
				updateUserTrips(newTripId);
				history.push('/myTripsPage');
			})
			.catch(err => console.error(err));
	};

	//Here is the USER!!!
	console.log('user', user);

	//maybe can be removed
	useEffect(() => {
		const id = localStorage.getItem('userId');
		if (id) {
			fetch(`https://city-route.herokuapp.com/api/users/${id}`, {})
				.then(response => response.json())
				.then(body => {
					setUser(body);
				});
		}
	}, []);

	const deleteTrip = tripId => {
		fetch(`https://city-route.herokuapp.com/api/trips/${tripId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				id: Number(user.id),
			}),
		})
			.then(response => response.json())
			.then(body => {
				var newMyTrips = [...(user.my_trips || [])];
				newMyTrips = newMyTrips.filter(trip => trip !== tripId);
				setUser({ ...user, my_trips: newMyTrips });
			});
	};

	return (
		<div className="App">
			<Header setlog={setlog} setUser={setUser} />
			<Switch>
				<Route path="/maps/:city" exact>
					<TripDetails user={user} lowPriceTrips={lowPriceTrips} serverUpdateUserTrips={serverUpdateUserTrips} />
				</Route>
				<Route path="/trips" exact>
					<SearchTripPage updateForm={updateForm} />
				</Route>
				<Route path="/signUp" exact>
					<SignUp serverError={serverError} addUser={addUser} signIn={signIn} />
				</Route>
				<Route path="/results" exact>
					<ResultsPage
						searchTripForm={searchTripForm}
						setLowPriceTrips={setLowPriceTrips}
						user={user}
						lowPriceTrips={lowPriceTrips}
						serverUpdateUserTrips={serverUpdateUserTrips}
					/>
				</Route>
				<Route path="/myTripsPage" exact>
					<MyTripsPage user={user} userTrips={userTrips} />
				</Route>
				<Route path="/tourGuideMenu" exact>
					<TourGuidePage
						user={user}
						addTrip={addTrip}
						updateUserTrips={updateUserTrips}
						userTrips={userTrips}
						deleteTrip={deleteTrip}
					/>
				</Route>
			</Switch>
		</div>
	);
}

export default App;
