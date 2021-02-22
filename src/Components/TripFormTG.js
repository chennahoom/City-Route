// import { useState, useEffect, useRef } from "react";
// import MapTG from "../Components/MapTourGuide";
// import Button from "@material-ui/core/Button";
// import FormControl from '@material-ui/core/FormControl';
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';

// const useStyles = makeStyles(theme => ({
// 	form: {
//     backgroundColor:'white',
//     width:1000,
//     height:200,
//     left: '50%',
//     marginTop:60,
//     transform: 'translateX(-50%)',
//     paddingTop: 'calc(3rem + 3rem)',
//     borderRadius:'0.5em',
//     boxShadow: '0 0.25rem 0.438rem 0 rgb(0 11 38 / 20%)',
// 	},

//   inputs: {
//     borderRadius:'0.5em',
//     width:250,
//     // height:70,
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     borderColor: '#80bdff',
//     marginLeft:30,
//     backgroundColor:'white',
//   },

//   button: {
//     marginLeft: 20,

//   }

// }));

// function AddTripForm(props) {
//   const classes = useStyles();  

  // const initForm = {
  //   trip_name_city: "",
  //   tour_date: "",
  //   tour_guide_id: props.user?.id,
  //   tour_time: "",
  //   start_time: "",
  //   ticketsBought: 0,
  // };

  // const formRef = useRef(null);
  // const [trip, setTrip] = useState(props.editTrip || initForm);
  // const [stops, setStops] = useState([]);
  // const [selectedStops, setSelectedStops] = useState([]);

  // useEffect(() => {
  //   if (props.editTrip) {
  //     setTrip(props.editTrip);
  //     setSelectedStops(props.editTrip.stops);
  //   }
  // }, [props.editTrip]);

  // useEffect(() => {
  //   async function getStops() {
  //     if (!trip.trip_name_city) return;
  //     const res = await fetch(
  //       `https://city-route.herokuapp.com/api/stops/?city=${trip.trip_name_city}`
  //     );
  //     const body = await res.json();
  //     setStops(body);

  //     if (props.editTrip) {
  //       setSelectedStops(props.editTrip.stops);
  //     } else {
  //       setSelectedStops([]);
  //     }
  //   }

  //   getStops();
  // }, [trip.trip_name_city]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setTrip({ ...trip, [name]: value });
  //   console.log(trip.id);
  // };
  // const onSave = (event) => {
  //   event.preventDefault();
  //   console.log(trip);
  //   if (
  //     !trip.trip_name_city ||
  //     !trip.tour_date ||
  //     !trip.tour_time ||
  //     !trip.start_time
  //   )
  //     return;
  //   trip.stops = selectedStops;

  //   if (!editTrip) {
  //     props.addTrip(trip);
  //   } else {
  //     // udate trip
  //     props.updateTrip(trip, trip.id);
  //   }
  //   formRef.current.reset(); // reset form
  //   setSelectedStops([]);
  //   setTrip(initForm);
  //   setStops([]);
  // };

  // function toggledStop(id) {
  //   const exists = selectedStops.find((stopId) => stopId === id);
  //   console.log("exists", exists);
  //   if (exists) {
  //     setSelectedStops(selectedStops.filter((stopId) => stopId !== id));
  //   } else {
  //     setSelectedStops([...selectedStops, id]);
  //   }
  // }

  // const { editTrip } = props;

  // const tour_time = editTrip?.tour_time;
  // const tour_date = editTrip?.tour_date;
  // const start_time = editTrip?.start_time;
  // // const mapContainerStyle = {
  // // 	width: '300px',
  // // 	height: '300px',
  // // 	margin: '0 auto',
  // // };

  // const handleCity = (event) =>{
  //   event.preventDefault();
  //   props.updateForm(event);
	// 	setCurrency(event.target.value);
  // }

  // const cities = [
	// 	{
	// 		value: 'Berlin',
	// 		label: 'Berlin',
	// 	},
	// 	{
	// 		value: 'Tel-Aviv',
	// 		label: 'Tel-Aviv',
	// 	},
  //   {
	// 		value: 'Paris',
	// 		label: 'Paris',
	// 	},
  //   {
	// 		value: 'Amsterdam',
	// 		label: 'Amsterdam',
	// 	},
  //   {
	// 		value: 'London',
	// 		label: 'London',
	// 	},
	// ];

	// const [currency, setCurrency] = useState('');

  

//   return (
//     <FormControl ref={formRef} onSubmit={onSave} className={classes.form}>
//     <Grid container spacing={2}>
//       <label>City</label>
        // <TextField className={classes.inputs} id="select"  label='City' select name='trip_name_city' onChange={handleInputChange}>
        //   {cities.map(option =>(
        //     <MenuItem key={option.value} value={option.value}>
        //       {option.label}
        //     </MenuItem>
        //   ))}
        // </TextField> 
//       <TextField className={classes.inputs} name='tour_date' label="Tour Date" label='dd/mm/yyyy' onChange={handleInputChange}></TextField>
//       <TextField className={classes.inputs} name='tour_time' label='Tour Time'></TextField>
//       <TextField className={classes.inputs} name='start_time' label='Start Time'></TextField>
//       {/* <Button className={classes.button} variant="contained" color='primary' onClick={onSubmit}>Submit</Button> */}
//     </Grid>

//   </FormControl>

//     // <div>
//     //   {/* <section className="tripFormBackg"></section> */}
//     //   <form className="formTG" ref={formRef} onSubmit={onSave}>
//     //     <label>
//     //       City:
//     //       <select
//     //         value={trip.trip_name_city}
//     //         name="trip_name_city"
//     //         onChange={handleInputChange}
//     //       >
//     //         <option value="">Choose</option>
//     //         <option selected value="Tel-Aviv">
//     //           Tel-Aviv
//     //         </option>
//     //         <option value="Berlin">Berlin</option>
//     //         <option value="London">London</option>
//     //         <option value="Amsterdam">Amsterdam</option>
//     //         <option value="Paris">Paris</option>
//     //       </select>
//     //       <br />
//     //     </label>
//     //     <label>
//     //       Tour-Date:
//     //       <input
//     //         defaultValue={tour_date}
//     //         type="text"
//     //         placeholder="01/06/2021"
//     //         name="tour_date"
//     //         onChange={handleInputChange}
//     //       />
//     //       <br />
//     //     </label>
//     //     <label>
//     //       Tour-Time:
//     //       <input
//     //         defaultValue={tour_time}
//     //         type="text"
//     //         name="tour_time"
//     //         onChange={handleInputChange}
//     //       />
//     //       <br />
//     //     </label>
//     //     <label>
//     //       Start-Time:
//     //       <input
//     //         type="text"
//     //         defaultValue={start_time}
//     //         name="start_time"
//     //         onChange={handleInputChange}
//     //       />
//     //       <br />
//     //     </label>
//     //     <br />
        // <label>
        //   {stops.map((stop) => {
        //     return (
        //       <div key={stop.id}>
        //         {stop.stop_name}
        //         <input
        //           type="checkbox"
        //           checked={selectedStops.includes(stop.id)}
        //           onChange={() => toggledStop(stop.id)}
        //         />
        //       </div>
        //     );
        //   })}
        // </label>

//     //     <Button variant="contained" color="primary" onClick={onSave}>
//     //       {props.editTrip ? "Save" : "Add"}
//     //     </Button>

//     //     {/* <button onClick={onSave}>{props.editTrip ? 'Save' : 'Add'}</button> */}
//     //   </form>
//     //   <MapTG stops={stops} trip={trip} selectedStops={selectedStops} />
//     // </div>
//   );
// }
// export default AddTripForm;

import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { useState, useEffect, useRef } from "react";
import { FormControl } from '@material-ui/core';
import MapTG from "../Components/MapTourGuide";
import { Link as Scroll } from "react-scroll";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AppBar, IconButton, Toolbar, Collapse } from "@material-ui/core";
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor:'white',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow:'none',
    height: '150%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1), 
    // display: 'flex',
    // flexDirection: 'row',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    marginBottom: -7,
    marginTop: 14,
    fontSize: 19,
  },
  gridForm: {
    boxShadow:'none',
    height:'60%',
  },
  goDown:{
    justifyContent:'center',
    alignItems:'center',
  },
  gridMap:{
    backgroundColor:'white',
  }
}));

function AddTripForm(props) {
  const classes = useStyles();

  const cities = [
		{
			value: 'Berlin',
			label: 'Berlin',
		},
		{
			value: 'Tel-Aviv',
			label: 'Tel-Aviv',
		},
    {
			value: 'Paris',
			label: 'Paris',
		},
    {
			value: 'Amsterdam',
			label: 'Amsterdam',
		},
    {
			value: 'London',
			label: 'London',
		},
	];

	const [currency, setCurrency] = useState('');

  const initForm = {
    trip_name_city: "",
    tour_date: "",
    tour_guide_id: props.user?.id,
    tour_time: "",
    start_time: "",
    ticketsBought: 0,
  };

  const formRef = useRef(null);
  const [trip, setTrip] = useState(props.editTrip || initForm);
  const [stops, setStops] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);

  useEffect(() => {
    if (props.editTrip) {
      setTrip(props.editTrip);
      setSelectedStops(props.editTrip.stops);
    }
  }, [props.editTrip]);

  useEffect(() => {
    async function getStops() {
      if (!trip.trip_name_city) return;
      const res = await fetch(
        `https://city-route.herokuapp.com/api/stops/?city=${trip.trip_name_city}`
      );
      const body = await res.json();
      setStops(body);

      if (props.editTrip) {
        setSelectedStops(props.editTrip.stops);
      } else {
        setSelectedStops([]);
      }
    }

    getStops();
  }, [trip.trip_name_city]);

  const handleInputChange = (event) => {
    if(event.target.name === 'trip_name_city'){ setCurrency(event.target.value)}
    const { name, value } = event.target;
    setTrip({ ...trip, [name]: value });
    console.log(trip.id);
    console.log(event.target.value);
  };
  console.log(trip);

  const onSave = (event) => {
    event.preventDefault();
    console.log(trip);
    if (
      !trip.trip_name_city ||
      !trip.tour_date ||
      !trip.tour_time ||
      !trip.start_time
    )
      return;
    trip.stops = selectedStops;

    if (!editTrip) {
      props.addTrip(trip);
    } else {
      // udate trip
      props.updateTrip(trip, trip.id);
    }
    formRef.current.reset(); // reset form
    setSelectedStops([]);
    setTrip(initForm);
    setStops([]);
  };

  function toggledStop(id) {
    
    const exists = selectedStops.find((stopId) => stopId === id);
    console.log("exists", id);
    if (exists) {
      setSelectedStops(selectedStops.filter((stopId) => stopId !== id));
    } else {
      setSelectedStops([...selectedStops, id]);
    }
  }

  const { editTrip } = props;

  const tour_time = editTrip?.tour_time;
  const tour_date = editTrip?.tour_date;
  const start_time = editTrip?.start_time;
  // const mapContainerStyle = {
  // 	width: '300px',
  // 	height: '300px',
  // 	margin: '0 auto',
  // };

  const handleCity = (event) =>{
    event.preventDefault();
    props.updateForm(event);
		setCurrency(event.target.value);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item className={classes.gridForm} xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add New Trip
          </Typography>
          <form className={classes.form} ref={formRef} onSubmit={onSave}>
            <label className={classes.label}>City</label>
            <TextField onChange={handleInputChange} fullWidth className={classes.inputs} id="select" value={trip.trip_name_city} label='City' select name='trip_name_city'>
              {cities.map(option =>(
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
          ))}
          </TextField> 
            < br />
            <label className={classes.label}>Tour Date</label>  
              <TextField
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="tour_date"
                label="dd/mm/yyyy"
                name="tour_date"
                value={tour_date}
              />
            <label className={classes.label}>Tour Time</label>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="tour_time"
              label="1-2"
              defaultValue={tour_time}
              id="tour_time"
            />
            <label className={classes.label}>Start Time</label>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="start_time"
              label="10AM"
              id="start_time"
              value={start_time}
            />

          <label className={classes.label}>Stops
          {stops.map((stop) => {
            return (
              <div key={stop.id}>
                {/* {stop.stop_name} */}
                <FormControlLabel control={
                  <Checkbox 
                    checked={selectedStops.includes(stop.id)} 
                    value={stop.stop_name} 
                    color="primary" 
                    onChange={() => toggledStop(stop.id)}
                  />}
                    label={stop.stop_name}
                />
                {/* <input
                  type="checkbox"
                  checked={selectedStops.includes(stop.id)}
                  onChange={() => toggledStop(stop.id)}
                /> */}
              </div>
            );
          })}
        </label>
            <Button
              onClick={onSave}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {props.editTrip ? "Save" : "Add"}
            </Button>

            <Scroll to="trip-list" smooth={true}>
              <IconButton>
                <ExpandMoreIcon className={classes.goDown} />
              </IconButton>
            </Scroll>
          </form>
        </div>
      </Grid>


      {/* Here is MAP */}
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid className={classes.gridMap} item xs={false} sm={4} md={7}>
        <MapTG stops={stops} trip={trip} selectedStops={selectedStops} />
      </Grid>
    </Grid>
  );
}

export default AddTripForm;