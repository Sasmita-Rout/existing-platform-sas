import React from "react";
import { CircularProgress, Stack } from "@mui/material";

const RequestLoader = ({ children, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
        >
          <CircularProgress size={80} />
        </Stack>
      ) : (
        children
      )}
    </>
  );
};

export default RequestLoader;
