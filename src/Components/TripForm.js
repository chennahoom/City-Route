import { useState } from "react";

function TripForm(props) {
  //TODO: need to add the ID of user
  const initForm = {
    trip_name_city: "",
    tour_date: "",
    tour_guide_id: props.user.id,
    tour_time: "",
    start_time: "",
    spaces_left: 10,
  };
  const [trip, setTrip] = useState(initForm);
  const [myTrips, setMyTrips] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTrip({ ...trip, [name]: value });
  };

  const onSave = (event) => {
    event.preventDefault();
    setMyTrips(props.user.my_trips);

    props.addTrip(trip);
    const newTrip = { my_trips: props.user.my_trips}
    // props.updateUserTrips(newTrip)
    // props.updateUserTrips(myTrips);
  };

  return (
    <form onSubmit={onSave}>
      <label>
        City:
        <select required name="trip_name_city" onChange={handleInputChange}>
          <option value="">Choose</option>
          <option value="Tel-Aviv">Tel-Aviv</option>
          <option value="Berlin">Berlin</option>
          <option value="London">London</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Paris">Paris</option>
        </select>
        <br />
      </label>
      <label>
        Tour-Date:
        <input type="date" name="tour_date" onChange={handleInputChange} />
        <br />
      </label>
      <label>
        Tour-Time:
        <input type="text" name="tour_time" onChange={handleInputChange} />
        <br />
      </label>
      <label>
        Start-Time:
        <input type="text" name="start_time" onChange={handleInputChange} />
        <br />
      </label>
      <button>Add Trip</button>
    </form>
  );
}

export default TripForm;
