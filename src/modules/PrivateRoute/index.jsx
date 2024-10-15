import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "../NavBar";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Content = styled(Box)(({ theme, isExpanded }) => ({
  marginLeft: isExpanded ? 240 : 80,
  transition: theme.transitions.create("margin-left", {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
}));

const PrivateRoute = () => {
  const value = Cookies.get("pmoUser");
  const [menuBar,setMenuBar] =useState(false);

  if (!value) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar onExpand={setMenuBar} />
      <Content isExpanded={menuBar}>
        <Outlet />
      </Content>
    </Box>
  );
};

export default PrivateRoute;
