import TripResults from '../Components/TripResults';

function MyTripsPage(props) {
<<<<<<< HEAD
  return (
    <div>
      <h2 id="pageTitle">My Trips</h2>
      <section className="row row-cols-1 row-cols-md-3" id="All-trips">
        {props.user.my_trips}
      </section>
    </div>
  );
=======
	console.log('USER', props.user);
	return (
		<div>
			<h2 id="pageTitle">My Trips</h2>

			<section className="row row-cols-1 row-cols-md-3" id="All-trips">
				{props.userTrips}
			</section>
		</div>
	);
>>>>>>> 35c17ec410ecc3842fb492c4f8b0b6d4573d29e3
}

export default MyTripsPage;

//article where all travelers trips are
