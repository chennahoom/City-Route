import TripResults from '../Components/TripResults';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Berlin1 from '../static/amsterdam.jpg';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Map from '../Components/Map';


const useStyles = makeStyles((theme) => ({
	root: {
		heigh: '100vh',

	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	image: {
		backgroundImage: `url(${Berlin1})`,
		backgroundRepeat: 'no-repeat',
		// heigh:1200,
		// objectFit:'cover',
		// height: 1230,
		// backgroundColor:
		// 	theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	cards: {
		width: '80px',
		marginTop: theme.spacing(1),
	}

}));

function ResultsPage(props) {
	const classes = useStyles();

	const [results, setResults] = useState([]);
	const [low, setLow] = useState([]);

	useEffect(() => {
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
				const lowPriceTrips = filteredTrips.filter(trip => trip.ticketsBought >= 10);
				setLow(lowPriceTrips);
				setResults(filteredTrips);
				props.setLowPriceTrips(lowPriceTrips);
			});
	}, []);

	return (
		<div className="results">
			<section id="left">
				{results.map((trip, i) => (
					<TripResults serverUpdateUserTrips={props.serverUpdateUserTrips} low={low} trip={trip} key={i} />
				))}
			</section>
			<section id="right">
				<Map city={props.searchTripForm.city}/>
			</section>
		</div>






		// workingggg
		// <Grid container spacing={2} direction='row' className={classes.root}>
		// 	{/* <Map city={props.searchTripForm.city}/> */}

		// 	<Grid item xs={12} sm={5} md={5} className={classes.cards}>
		// 		{results.map((trip, i) => (
		// 			// <Grid item sm={5} md={6}>
		// 				<TripResults serverUpdateUserTrips={props.serverUpdateUserTrips} low={low} trip={trip} key={i} />
		// 			// </Grid>
		// 		))}
		// 	</Grid>
		// 	<Grid item xs={false} sm={7} md={7} className={classes.image}>
		// 		<Paper className={classes.Paper}>
		// 			{/* <Map city={props.searchTripForm.city}/> */}
		// 		</Paper>
		// 	</Grid>
		// </Grid>

		// {/* <section className="container"> */}
		// 	{/* <h2 className="pageTitle">Where would you like to travel?</h2> */}
		// 	{/* <section className="row row-cols-1 row-cols-md-3"></section> */}
		// 	{results.map((trip, i) => (
		// 		<TripResults serverUpdateUserTrips={props.serverUpdateUserTrips} low={low} trip={trip} key={i} />
		// 	))}
		// {/* </section> */}
	);
}

function stringToDate(date) {
	if (!date) return new Date();
	const [day, month, year] = date.split('/');
	const result = new Date(year, month - 1, day);
	return result;
}

export default ResultsPage;
