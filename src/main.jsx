import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThemeContext from "./ThemeContext.jsx";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { REACT_APP_GOOGLE_CLIENT_ID } from "./config/index.jsx";
import {DashboardLayoutBasic} from './components/organism/NavBar.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContext>
      <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
        <DashboardLayoutBasic />
        <App />
      </GoogleOAuthProvider>
    </ThemeContext>
  </StrictMode>
);
