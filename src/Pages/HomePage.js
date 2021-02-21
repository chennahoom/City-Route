import Trip from "../Components/Trip";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import HeaderLanding from "../Components/HeaderLanding";
import Register from "./SignUp";
import SignUp from "./SignUp";

// //<img src="https://i.postimg.cc/85GL85n7/image.jpg"
// //<img src="https://i.postimg.cc/GmZkQzFJ/image.jpg"
// //

// let trips = [
//   { name: "Berlin", image: "https://i.postimg.cc/d3td1fFv/image.jpg" },
//   { name: "London", image: "https://i.postimg.cc/85GL85n7/image.jpg" },
// ];
// function HomePage(props) {
//   return (
//     <div>
//       <section className="container">
//         <h2 id="pageTitle">Where would you like to travel today?</h2>

//         <section className="row row-cols-1 row-cols-md-3">
//           {trips.map((trip) => {
//             return (
//               <section className="col mb-4">
//                 <Trip trip={trip} />
//               </section>
//             );
//           })}
//         </section>
//       </section>
//     </div>
//   );
// }

// export default HomePage;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg10.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

function HomePage(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderLanding />
      <SignUp serverError={props.serverError} addUser={props.addUser} signIn={props.signIn} />
    </div>
  );
}

export default HomePage;
