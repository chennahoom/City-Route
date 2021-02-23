import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useState } from "react";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "white",
    boxShadow: "none",
    background: "none",
    height: "60px",
  },
  appbarWrapper: {
  },
  appbarTitle: {
    flexGrow: "1",
    color: "black",
    underline: "none",
  },
  icon: {
    color: "black",
    fontSize: "2rem",
  },
  colorText: {
    color: "black",
  },
}));
function Header(props) {
  const classes = useStyles();
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);

  const [value, setValue] = useState(0);

  const handleClickTab = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };



  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.appbarWrapper}>
          <Link className={classes.appbarTitle} to="/">
            <h1 className={classes.appbarTitle}>
              City-<span className={classes.colorText}>Route.</span>
            </h1>
          </Link>
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            <SortIcon className={classes.icon} />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem component={Link} to="/trips">
              <ListItemIcon>
                <WorkOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Search for a Trip" />
            </StyledMenuItem>

            <StyledMenuItem component={Link} to="/myTripsPage">
              <ListItemIcon>
                <AssignmentIndOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="My Trips" />
            </StyledMenuItem>

            <StyledMenuItem component={Link} to="/">
              <ListItemIcon>
                <ExitToAppOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Logout setUser={props.setUser} setlog={props.setlog} />
            </StyledMenuItem>
          </StyledMenu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
