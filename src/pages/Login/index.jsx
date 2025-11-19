import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/PlatformProject");
  }, [navigate]);

  return null; // no UI
};

export default LoginPage;
