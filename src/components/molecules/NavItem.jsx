import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavItem = ({ icon, title, path, isExpanded, currentPath }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(path);
  };

  return (
    <ListItem
      button
      onClick={handleNavigation}
      sx={{
        "&:hover": {
          backgroundColor: "#e57373",
        },
        backgroundColor: currentPath === path ? "#ef5350" : "transparent",
      }}
    >
      <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
      {isExpanded && <ListItemText primary={title} sx={{ color: "white" }} />}
    </ListItem>
  );
};

export default NavItem;
