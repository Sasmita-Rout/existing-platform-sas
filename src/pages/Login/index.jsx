import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useUserStore } from "../../zustand/UserInfo/UserInfo";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleSuccess = (response) => {
    if (response?.credential) {
      Cookies.set("pmoUser", response?.credential, { expires: 0.5 });
      const userData = JSON.parse(atob(response?.credential.split(".")[1]));
      setUser(userData);
      navigate("/home");
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default LoginPage;
