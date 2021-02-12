import { useEffect, useState } from "react";

function AddTripForm(props) {

  const initForm = {
    trip_name_city: "",
    tour_date: "",
    tour_guide_id: props.user?.id,
    tour_time: "",
    start_time: "",
<<<<<<< HEAD
    ticketsBought: 0,
=======
    ticketsBought: 0, 
>>>>>>> b5c620800246b65919e9e7431ef028f36a674ef1
  };
  const [trip, setTrip] = useState(initForm);
  const [myTrips, setMyTrips] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTrip({ ...trip, [name]: value });
    console.log(trip);
  };
  const onSave = (event) => {
    event.preventDefault();
<<<<<<< HEAD
    if (!trip.trip_name_city || !trip.tour_date || !trip.ticketsBought || !trip.tour_time || !trip.start_time) return;
=======
    if (!trip.trip_name_city || !trip.tour_date || !trip.tour_time || !trip.start_time) return;
>>>>>>> b5c620800246b65919e9e7431ef028f36a674ef1
    setMyTrips(props.user.my_trips);
    props.addTrip(trip);
    const newTrip = { my_trips: props.user?.my_trips }
    // setTrip(initForm);
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
        <input type="text" placeholder="01/06/2021" name="tour_date" onChange={handleInputChange} />
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
export default AddTripForm;