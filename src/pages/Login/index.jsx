import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUserStore } from "../../zustand/index";
import { Box, Paper, Typography, Button } from "@mui/material";
import theme from "../../modules/styles/theme";
import { PublicClientApplication } from "@azure/msal-browser";
import { FaMicrosoft } from 'react-icons/fa';

const msalConfig = {
  auth: {
    clientId: "34c2bfbb-a701-4594-a453-bf0893d30b67",
    authority:
      "https://login.microsoftonline.com/9e19c113-9fbf-4030-b93e-10fc81bd1965",
    redirectUri: window.location.origin,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [error, setError] = useState(null);
  const handleLogin = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["openid", "profile", "email", "User.Read"],
      });
      const accessToken = loginResponse.accessToken;

      if (!accessToken) throw new Error("Access token not found.");

      console.log("Access Token:", accessToken);

      const userInfo = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => res.json());

      console.log("User info:", userInfo);

      if (userInfo.mail && userInfo.mail.endsWith("@accionlabs.com")) {
        setUser(userInfo);
        Cookies.set("pmoUser", userInfo, { expires: 0.5 });
        console.log("Navigating to PlatformProject page");
        navigate("/PlatformProject");
      } else {
        setError("Please sign in with an @accionlabs.com account.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("An error occurred while signing in.");
    }
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
          <Typography variant="h6" gutterBottom>
            Sign in with Microsoft
          </Typography>
        </Box>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Choose an account
        </Typography>

        <Typography variant="body2" color="textSecondary" gutterBottom>
          to continue to{" "}
          <Typography
            component="span"
            sx={{ fontWeight: "bold", color: theme.palette.highlight.main }}
          >
            PMO Intranet
          </Typography>
        </Typography>
        <Button sx={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: '#F3F3F3', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }} onClick={handleLogin}> <FaMicrosoft size={20} /> Sign in with Microsoft</Button>       
        <Typography>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
