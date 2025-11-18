import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/PlatformProject");
  }, [navigate]);

  // Render nothing
  return null;
};

export default LoginPage;
