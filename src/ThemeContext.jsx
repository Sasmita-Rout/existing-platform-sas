import theme from "./config/theme.config.jsx";
import PropTypes from "prop-types";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";

const ThemeContext = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
};
export default ThemeContext;

ThemeContext.propTypes = {
  children: PropTypes.node.isRequired,
};
