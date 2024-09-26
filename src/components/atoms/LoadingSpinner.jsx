import React from "react";
import { Box,CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box style={styles.spinnerContainer}>
      <CircularProgress style={styles.spinner} />
    </Box>
  );
};

const styles = {
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  spinner: {
    color: "#aaa",
  },
};

export default LoadingSpinner;
