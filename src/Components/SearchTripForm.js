import FormControl from '@material-ui/core/FormControl';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
	form: {
    backgroundColor:'white',
    width:1000,
    height:200,
    left: '50%',
    marginTop: '-50px',
    transform: 'translateX(-50%)',
    paddingTop: 'calc(3rem + 3rem)',
    borderRadius:'0.5em',
    boxShadow: '0 0.25rem 0.438rem 0 rgb(0 11 38 / 20%)',
	},

  inputs: {
    borderRadius:'0.5em',
    width:250,
    // height:70,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    borderColor: '#80bdff',
    marginLeft:30,
    backgroundColor:'white',
  },

  button: {
    marginLeft: 20,

  }

}));

function SearchTripForm(props) {
  const classes = useStyles();  
  const history = useHistory();

  function onSubmit(event) {
    console.log(currency);
    event.preventDefault();
    history.push("/results");
  }

  const handleCity = (event) =>{
    event.preventDefault();
    props.updateForm(event);
		setCurrency(event.target.value);
  }

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

  return (
    <FormControl onSubmit={onSubmit} onChange={props.updateForm} className={classes.form}>
      <Grid container spacing={2}>
          <TextField htmlFor="name_city" className={classes.inputs} id="select" value={currency} label='City' select name='city' onChange={handleCity}>
            {cities.map(option =>(
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> 
        <TextField className={classes.inputs} name='start' label='dd/mm/yyyy'></TextField>
        <TextField className={classes.inputs} name='end' label='dd/mm/yyyy'></TextField>
        <Button className={classes.button} variant="contained" color='primary' onClick={onSubmit}>Submit</Button>
      </Grid>

    </FormControl>

  );
}

export default SearchTripForm;
