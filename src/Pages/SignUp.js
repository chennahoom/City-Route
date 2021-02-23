import { useState } from "react";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppForm from "../View/AppForm";
import { useEffect } from "react";
import { IconButton, Collapse } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  homepage: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg10.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  form: {
    marginTop: theme.spacing(6),
    padding: 20,
    alignContent: "center",
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
  details: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Nunito",
  },
  appbar: {
    background: "none",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  colorText: {
    color: "000",
  },
  container: {
    textAlign: "center",
  },
  title: {
    color: "#000",
    fontSize: "4.5rem",
  },
  goDown: {
    color: "#000",
    fontSize: "4rem",
  },
}));

function Register(props) {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  const initForm = {
    full_name: "",
    email: "",
    type_of_user: "",
    phone: "",
  };
  const [user, setUser] = useState(initForm);

  const onSave = (event) => {
    event.preventDefault();
    if (!user.full_name || !user.email || !user.type_of_user || !user.phone)
      return;
    props.addUser(user);
    setUser(initForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "type_of_user") {
      setCurrency(event.target.value);
      setUser({ ...user, [name]: value });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const typeOfUser = [
    {
      value: "Traveler",
      label: "Traveler",
    },
    {
      value: "Tour Guide",
      label: "Tour Guide",
    },
  ];

  const [currency, setCurrency] = useState("");

  return (
    <div className={classes.homepage}>
      <div className={classes.details} id="header">
        <Collapse
          in={checked}
          {...(checked ? { timeout: 2000 } : {})}
          collapsedHeight={50}
        >
          <div className={classes.container}>
            <h1 className={classes.title}>
              Welcome to <br />
              City<span className={classes.colorText}>Route.</span>
            </h1>
            <Scroll to="signup" smooth={true}>
              <IconButton>
                <ExpandMoreIcon className={classes.goDown} />
              </IconButton>
            </Scroll>
          </div>
        </Collapse>
      </div>
      <div className={classes.root} id="signup">
        <AppForm>
          <React.Fragment>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="#" onClick={props.signIn} underline="always">
                Already have an account?
              </Link>
              <h4 className="error">{props.serverError}</h4>
            </Typography>

            <FormControl onSubmit={onSave} className={classes.form}>
              <Grid container spacing={2}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="full_name"
                  defaultValue={user.name}
                  required
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  defaultValue={user.email}
                  type="email"
                  required
                  onChange={handleInputChange}
                />
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="select"
                    label="Type of user"
                    value={currency}
                    name="type_of_user"
                    required
                    fullWidth
                    select
                    onChange={handleInputChange}
                  >
                    {typeOfUser.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone number"
                    name="phone"
                    type="tel"
                    required
                    onChange={handleInputChange}
                  />
                </Grid>
                <Button
                  fullWidth
                  type="reset"
                  onClick={onSave}
                  className={classes.button}
                  variant="contained"
                >
                  Sign Up
                </Button>
              </Grid>
            </FormControl>
          </React.Fragment>
        </AppForm>
      </div>
    </div>
  );
}

export default Register;
