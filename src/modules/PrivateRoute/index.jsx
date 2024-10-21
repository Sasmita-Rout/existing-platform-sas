import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "../NavBar";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme, isExpanded }) => ({
  marginLeft: isExpanded ? 240 : 80,
  transition: theme.transitions.create("margin-left", {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
}));

const PrivateRoute = () => {
  const value = Cookies.get("pmoUser");
  const [isExpanded, setIsExpanded] = useState(false);

  if (!value) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar setIsExpanded={setIsExpanded} isExpanded={isExpanded} />
      <StyledBox isExpanded={isExpanded}>
        <Outlet />
      </StyledBox>
    </Box>
  );
};

export default PrivateRoute;
