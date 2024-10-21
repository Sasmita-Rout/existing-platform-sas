import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useUserStore } from "../../zustand/index";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleSuccess = async (response) => {
    if (response?.credential) {
      Cookies.set("pmoUser", response?.credential, { expires: 0.5 });
      const userData = await JSON.parse(
        atob(response?.credential.split(".")[1])
      );
      if (userData.name) {
        setUser(userData);
        navigate("/home");
      } else {
        navigate("/");
      }
    }
  };

  const handleError = () => {
    console.log("Login Failed");
    navigate("/PageNotFound");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default LoginPage;
