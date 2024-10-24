import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#dc004e"
    }, 
    grey: {
      main: "#626e73"
    },
    gray: {
      main: "#5A646E"
    },
    black: {
      main: "black"
    },
    light: {
      main: "#fafbfc"
    },
    white: {
      main: "#fff"
    },
    lightGray: {
      main: "#d1d1d1"
    },
    highlight:{
      main: "#1976d2"
    }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 500
    },
    body1: {
      fontSize: "1rem"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    }
  }
})

export default theme
