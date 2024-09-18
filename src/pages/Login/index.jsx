import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const handleSuccess = (response) => {
    console.log("Login ", response);
    response?.credential &&
      localStorage.setItem("pmoUser", JSON.stringify(response.credential));
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default LoginPage;
