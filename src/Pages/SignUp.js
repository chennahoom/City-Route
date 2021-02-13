import { useState } from 'react';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppForm from '../View/AppForm';
import { useForm } from "react-hook-form";

const useStyles = makeStyles(theme => ({
	form: {
		marginTop: theme.spacing(6),
		padding: 20,
		alignContent: 'center',
	},
	button: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
	feedback: {
		marginTop: theme.spacing(2),
	},
}));

function Register(props) {
	const classes = useStyles();
	const initForm = {
		full_name: '',
		email: '',
		type_of_user: '',
		phone: '',
	};
	const [user, setUser] = useState(initForm);
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	let name = query.get('name');
	let email = query.get('email');

	const onSave = (event) => {
		event.preventDefault();
		if (!user.full_name || !user.email || !user.type_of_user || !user.phone) return;
		props.addUser(user);
		setUser(initForm);		
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (name === 'type_of_user') {
			setCurrency(event.target.value);
			setUser({ ...user, [name]: value });
		} else {
			setUser({ ...user, [name]: value });
		}
		console.log(user);
	};

	const typeOfUser = [
		{
			value: 'Traveler',
			label: 'Traveler',
		},
		{
			value: 'Tour Guide',
			label: 'Tour Guide',
		},
	];

	const [currency, setCurrency] = useState('');


	return (
		<AppForm>
			<React.Fragment>
				<Typography variant="h3" gutterBottom marked="center" align="center">
					Sign Up
				</Typography>
				<Typography variant="body2" align="center">
					<Link href='#' onClick={props.signIn} underline="always">
						Already have an account?
					</Link>
					<h4 className="error">{props.serverError}</h4>
				</Typography>

				<FormControl onSubmit={onSave} className={classes.form}>
					<Grid container spacing={2}>
						<TextField fullWidth label="Full Name" name="full_name" defaultValue={user.name} defaultValue={user.name} required onChange={handleInputChange} />
						<TextField fullWidth label="Email" name="email" defaultValue={user.email} type="email" required onChange={handleInputChange} />
						<Grid item xs={12} sm={6}>
							<TextField
								id="select"
								label="Type of user"
								value={currency}
								name="type_of_user"
								required
								fullWidth
								select
								onChange={handleInputChange}>
								{typeOfUser.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField fullWidth label="Phone number" name="phone" type="tel" required onChange={handleInputChange} />
						</Grid>
						<Button fullWidth type="reset" onClick={onSave} className={classes.button} variant="contained">
							Sign Up
						</Button>
					</Grid>
				</FormControl>
			</React.Fragment>
		</AppForm>
		// <form onSubmit={onSave}>
		//   <label>
		//     Full Name:
		//     <input
		//       type="text"
		//       defaultValue={name}
		//       name="full_name"
		//       onChange={handleInputChange}
		//     />
		//     <br />
		//   </label>
		//   <label>
		//     Email:
		//     <input
		//       type="email"
		//       name="email"
		//       defaultValue={email}
		//       onChange={handleInputChange}
		//     />
		//     <br />
		//   </label>
		//   <label>
		//     Type of user:
		//     <select required name="type_of_user" onChange={handleInputChange}>
		//       <option value="">Choose</option>
		//       <option value="Traveler">Traveler</option>
		//       <option value="Tour Guide">Tour Guide</option>
		//     </select>
		//     <br />
		//   </label>

		//   <label>
		//     Phone Number:{" "}
		//     <input type="tel" name="phone" onChange={handleInputChange} />
		//     <br />
		//   </label>
		//   <button>Sign Up</button>
		// </form>
	);
}

export default Register;
