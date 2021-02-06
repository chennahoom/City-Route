import './App.css';

import { useState } from 'react';

import Header from './Components/Header';
import SearchTripPage from './Pages/SearchTripsPage';
import ResultsPage from './Pages/ResultsPage';
import TripDetailsPage from './Pages/TripDetailsPage';
import MyTripsPage from './Pages/MyTripsPage';
import { useHistory } from 'react-router-dom';
import Map from './Components/MapView';
import Register from './Pages/Register';
import TourGuidePage from './Pages/TourGuidePage';

import { Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';

import GoogleLogin, { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './Components/utils/refreshToken';

const clientId = '233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com';

function App() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [url, setUrl] = useState('');
	// const [userId, setUserId] = useState("");
	const [user, setUser] = useState(null);
	// const [userTrips, setUserTrips] = ('');

	const [searchTripForm, setSearchTripForm] = useState({
		city: '',
		start: '',
		end: '',
	});
	const [userTrips, setUserTrips] = useState([]);
	const [isLogin, setLogin] = useState(false);

	function updateForm(event) {
		const { value, name } = event.target; // event.target -> DOM ELEMENT THAT FIRE EVENT
		setSearchTripForm({ ...searchTripForm, [name]: value });
	}

	// const [results, setResults] = useState([]);
	const history = useHistory();

	const setlog = res => {
		setLogin(res);
	};

	const signUp = (newUser) => {
    console.log("im in signup");
    console.log(newUser.type_of_user);


		if (newUser.type_of_user === 'Traveler') {
      console.log(newUser.type_of_user);
			history.push('/trips');
		} else {
			history.push('/tourGuideMenu');
		}
	};

	const addUser = (newUser) => {
		fetch(`https://city-route.herokuapp.com/api/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(newUser),
		})
			.then(response => response.json())
			.then(UserNew => {
				console.log(UserNew);
				setUser(newUser);
        console.log(UserNew.type_of_user);
				signUp(newUser);
			})
			.catch(err => console.error(err));
	};

	const onSuccess = res => {
		// setName(res.profileObj.name);
		// setEmail(res.profileObj.email);
		// setUrl(res.profileObj.imageUrl);
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
					return history.push(`/login?email=${res.profileObj.email}&name=${res.profileObj.name}`);
				}
				setUser(user);

				console.log(user.type_of_user);

				if (user.type_of_user === 'Traveler') {
					history.push('/trips');
				} else {
					history.push('/tourGuideMenu');
				}
				console.log(user.type_of_user);
				console.log(user);
  });
<<<<<<< HEAD
  const [userTrips, setUserTrips] = useState([]);
  const [isLogin, setLogin] = useState(false);

  function updateForm(event) {
    const { value, name } = event.target; // event.target -> DOM ELEMENT THAT FIRE EVENT
    setSearhTripForm({ ...searhTripForm, [name]: value });
  }

  // const [results, setResults] = useState([]);
  const history = useHistory();

  const setlog = (res) => {
    setLogin(res);
  };

  const signUp = (newUser) => {
    if (newUser.type_of_user === "Traveler") {
      history.push("/trips");
    } else {
      history.push("/tourGuideMenu");
    }
  };

  const addUser = (newUser) => {
    fetch(`https://city-route.herokuapp.com/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((newUser) => {
        console.log(newUser);
        setUser(newUser);
        signUp(newUser);
      })
      .catch((err) => console.error(err));
  };

  const addTrip = (newTrip) => {
    fetch(`https://city-route.herokuapp.com/api/trips/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newTrip),
    })
      .then((response) => response.json())
      .then((newTrip) => {
        console.log(newTrip);
        console.log(newTrip.id);
        updateUserTrips(newTrip.id);
        // console.log(newTripId);
      })
      .catch((err) => console.error(err));
  };

  const updateUserTrips = (newTripId) => {
    // setMyTrips();
    var newMyTrips = user.my_trips;
    newMyTrips.push(newTripId);
    fetch(`https://city-route.herokuapp.com/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        my_trips: newMyTrips,
      }),
    })
      .then((response) => response.json())
      .then((newTrip) => {
        console.log(newTrip);
        console.log(userTrips);
        // setUserTrips(user.my_trips);
        // updateTrips(newTrip);
      })
      .catch((err) => console.error(err));
  };

  //Here is the USER!!!
  console.log("user", user);

  return (
      <div className="App">
        <Header setlog={setlog} setUser={setUser} />
        <Switch>
          <Route path="/trips" exact>
            <SearchTripPage updateForm={updateForm} />
          </Route>
          <Route path="/register" exact>
            <Register addUser={addUser} />
          </Route>
          <Route path="/results" exact>
            <ResultsPage
              searhTripForm={searhTripForm}
              // updateTrips={updateTrips}
            />
          </Route>
          <Route path="/map/:city" exact>
            <TripDetailsPage updateUserTrips={updateUserTrips}/>
          </Route>
          <Route path="/map/:city" exact>
            <Map />
          </Route>
          {/* <Route path="/article/:usersId" exact> */}
          <Route path="/MyTripsPage" exact>
            <MyTripsPage user={user} updateUserTrips={updateUserTrips} />
          </Route>
          <Route path="/login" exact>
            <LoginPage
              setName={setName}
              setEmail={setEmail}
              setUrl={setUrl}
              name={name}
              email={email}
              url={url}
              setlog={setlog}
              setUser={setUser}
              addUser={addUser}
            />
          </Route>
          <Route path="/tourGuideMenu" exact>
            <TourGuidePage
              user={user}
              addTrip={addTrip}
              updateUserTrips={updateUserTrips}
              userTrips={userTrips}
            />
          </Route>
          {/* <Route path="/addTrip" exact>
=======
		// getAllUsers();

		//findUserByEmail(res.profileObj.email);
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
				// console.log(newTripId);
			})
			.catch(err => console.error(err));
	};

	const updateUserTrips = newTripId => {
		// setMyTrips();
		var newMyTrips = user.my_trips;
		newMyTrips.push(newTripId);
		fetch(`https://city-route.herokuapp.com/api/users/${user.id}`, {
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
				console.log(userTrips);
				// setUserTrips(user.my_trips);
				// updateTrips(newTrip);
			})
			.catch(err => console.error(err));
	};

	//Here is the USER!!!
	console.log('user', user);

	return (
		<div className="App">
			<Header setlog={setlog} setUser={setUser} />
			<Switch>
				<Route path="/trips" exact>
					<SearchTripPage updateForm={updateForm} />
				</Route>
				<Route path="/register" exact>
					<Register addUser={addUser} />
				</Route>
				<Route path="/results" exact>
					<ResultsPage
						searchTripForm={searchTripForm}
						// updateTrips={updateTrips}
					/>
				</Route>
				<Route path="/map/:city" exact>
					<TripDetailsPage user={user} />
				</Route>
				<Route path="/map/:city" exact>
					<Map />
				</Route>
				{/* <Route path="/article/:usersId" exact> */}
				{/* <Route path="/article/:usersId" exact>
            <MyTripsPage user={user} userTrips={userTrips} />
          </Route> */}
				<Route path="/MyTripsPage/:usersId" exact>
					<MyTripsPage user={user} userTrips={userTrips} />
				</Route>
				<Route path="/login" exact>
					<LoginPage
						// setName={setName}
						// setEmail={setEmail}
						// setUrl={setUrl}
						name={name}
						email={email}
						url={url}
						setlog={setlog}
						setUser={setUser}
						addUser={addUser}
						signIn={signIn}
					/>
				</Route>
				<Route path="/tourGuideMenu" exact>
					<TourGuidePage user={user} addTrip={addTrip} updateUserTrips={updateUserTrips} userTrips={userTrips} />
				</Route>
				{/* <Route path="/addTrip" exact>
>>>>>>> 35c17ec410ecc3842fb492c4f8b0b6d4573d29e3
            <AddTrip />
          </Route> */}
			</Switch>
		</div>
	);
}

export default App;
