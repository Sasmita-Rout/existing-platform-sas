import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUserStore } from "../../zustand";
import { Box, Paper, Typography, Button } from "@mui/material";
import theme from "../../modules/styles/theme";
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "34c2bfbb-a701-4594-a453-bf0893d30b67",
    authority: "https://login.microsoftonline.com/9e19c113-9fbf-4030-b93e-10fc81bd1965",
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
        prompt: "select_account", // ✅ Force account picker every time
      });

      const accessToken = loginResponse.accessToken;
      if (!accessToken) throw new Error("Access token not found.");

      const userInfo = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => res.json());

      const email = userInfo.mail || userInfo.userPrincipalName;
      console.log("Logged in with email:", email); // ✅ Console log email
      sessionStorage.setItem("userEmail", email); // ✅ Store email


      if (email && email.endsWith("@accionlabs.com")) {
        setUser(userInfo);
        Cookies.set("pmoUser", userInfo, { expires: 0.5 });
        navigate("/PlatformProject");
      } else {
        setError("Please sign in with an @accionlabs.com account.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during sign in.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center", maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Sign in with Microsoft
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Choose an account to continue to{" "}
          <Typography
            component="span"
            sx={{ fontWeight: "bold", color: theme.palette.highlight.main }}
          >
            PMO Intranet
          </Typography>
        </Typography>

        <Button
          onClick={handleLogin}
          sx={{
            mt: 2,
            backgroundColor: "#F3F3F3",
            color: "black",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
          fullWidth
        >
          Sign in with Microsoft
        </Button>

        {error && (
          <Typography mt={2} color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;
