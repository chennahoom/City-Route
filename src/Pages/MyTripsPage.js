import { useParams } from 'react-router-dom';
import MyTrips from '../Components/MyTrips';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	gridContainer: {
		paddingLeft: "15px",
		paddingRight: "15px",
	}
});

function MyTripsPage(props) {
	const classes = useStyles();
	return (
		<Grid container justify="center" className={classes.gridContainer}>
			<h2 id="pageTitle">My Trips</h2>
			{props.user?.my_trips.map((tripId, i) =>(
				<MyTrips key={i} data={tripId} />
			))}
		</Grid>
	);
}

export default MyTripsPage;