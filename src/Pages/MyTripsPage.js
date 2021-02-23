import MyTrips from "../Components/MyTrips";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
	gridContainer: {
		paddingLeft: "15px",
		paddingRight: "15px",
		marginTop: "100px",
	},
});

function MyTripsPage(props) {
	console.log('MyTripsPage',props);
	const classes = useStyles();
	return (
		<Grid container justify="center" className={classes.gridContainer}>
			{props.user?.my_trips.map((tripId, i) =>(
				<MyTrips key={i} data={tripId} />
			))}
		</Grid>
	);
}

export default MyTripsPage;
