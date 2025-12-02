import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/PlatformProject", { replace: true });
  }, [navigate]);

  return null;
};

export default LoginPage;
