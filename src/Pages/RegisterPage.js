import { GoogleLogin } from "react-google-login";

const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);

  }
function RegisterPage() {
  return (
    <GoogleLogin
      clientId="233069535985-vfone0gmelp0cfv62424j18a94av35i3.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default RegisterPage;
