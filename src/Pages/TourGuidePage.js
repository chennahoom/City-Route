import { useState } from "react";
import AddTripForm from "../Components/TripFormTG";
import TripsList from "../Components/TripsList";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function TourGuidePage(props) {
  const [listChanged, setListChanged] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [duplicate, setDuplicate] = useState({});
  const [editTrip, setEditTrip] = useState(null);

  const classes = useStyles();

  const updateTrip = (trip, id) => {
    fetch(`https://city-route.herokuapp.com/api/trips/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(trip),
    })
      .then((response) => response.json())
      .then((newTrip) => {
        setEditTrip(null);
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
        serverUpdateUserTrips(+newTrip.id);
        props.updateUserTrips(+newTrip.id);
      })
      .catch((err) => console.error(err));
  };

  const serverUpdateUserTrips = (newTripId) => {
    var newMyTrips = [];
    if (props.user.my_trips) {
      newMyTrips = [...props.user.my_trips];
    }
    newMyTrips.push(newTripId);
    fetch(`https://city-route.herokuapp.com/api/users/${props.user.id}`, {
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
      .then((newTrip) => {})
      .catch((err) => console.error(err));
  };

  function duplicateTrip() {
    addTrip({ ...duplicate, ...form });
    setOpen(false);
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <div>
      <AddTripForm
        editTrip={editTrip}
        user={props.user}
        addTrip={addTrip}
        isEditing={props.isEditing}
        updateTrip={updateTrip}
      />
      <div id="trip-list">
        <TripsList
          id="trip-list"
          tourGuideTrips={props.user?.my_trips || []}
          user={props.user}
          editTrip={editTrip}
          setEditTrip={setEditTrip}
          userTrips={props.userTrips}
          deleteTrip={props.deleteTrip}
          setListChanged={setListChanged}
          listChanged={listChanged}
          onDuplicate={(trip) => {
            setDuplicate(trip);
            setOpen(true);
          }}
        />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div>
          <div className={classes.paper}>
            <h2>Duplicate a Trip</h2>

            <label htmlFor="">Date:</label>
            <input name="tour_date" type="text" onChange={onChange} />
            <label htmlFor="">Start Time:</label>
            <input type="text" name="start_time" onChange={onChange} />
            <br />

            <Button onClick={duplicateTrip} variant="contained" color="primary">
              Duplicate
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TourGuidePage;
