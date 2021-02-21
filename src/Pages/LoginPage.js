import { useHistory } from "react-router-dom";
import Register from "./SignUp";

function LoginPage(props) {
  return (
    <div>
      <button onClick={props.signIn} className="button">
        <img src="icons/google.svg" alt="google login" className="icon"></img>
        <span className="buttonText">Sign in with Google</span>
      </button>

      <Register addUser={props.addUser}></Register>
    </div>
  );
}

export default LoginPage;
