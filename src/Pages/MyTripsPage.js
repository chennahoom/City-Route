function MyTripsPage(props) {
  return (
    <div>
      <h2 id="pageTitle">My Trips</h2>
      <section className="row row-cols-1 row-cols-md-3" id="All-trips">
        {props.user.my_trips}
      </section>
    </div>
  );
}

export default MyTripsPage;
