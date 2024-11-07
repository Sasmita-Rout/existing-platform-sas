import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useUserStore } from "../../zustand/index";
import { Box, Paper, Typography } from "@mui/material";
import GoogleIcon from "../../assets/icons/Google_Icons.png";
import theme from "../../modules/styles/theme";

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

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, textAlign: "center", maxWidth: 400 }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          <img src={GoogleIcon} alt="Google Icon" width={40} style={{ marginRight: 8 }}/>
          <Typography variant="h6" gutterBottom>
          Sign in with Google
        </Typography>
        </Box>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Choose an account
        </Typography>

        <Typography variant="body2" color="textSecondary" gutterBottom>
          to continue to <Typography component="span" sx={{ fontWeight: 'bold', color: theme.palette.highlight.main }}>PMO Intranet</Typography>
        </Typography>

        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          ux_mode="popup"
          sx={{ mt: 2 }}
        />
      </Paper>
    </Box>
  );
};

export default LoginPage;