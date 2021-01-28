function Trip(props) {
  return (
    <div className="card bg-light text-dark">
      <a href="#" className="stretched-link">
        <img src={props.trip.image} className="card-img" alt="Berlin" />
      </a>
      <div className="card-img-overlay">
        <h5 className="options">{props.trip.name}</h5>
      </div>
    </div>
  );
}

export default Trip;
