import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
const NavItem = ({
  icon,
  title,
  path,
  isExpanded,
  currentPath,
  isActive,
  onClick,
}) => {
  return (
    <ListItem
      button
      onClick={onClick}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#d1d1d1",
        },
        backgroundColor: isActive ? "#e57373" : "transparent",
        color: isActive ? "white" : "inherit",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
      {isExpanded && <ListItemText primary={title} sx={{ color: "white" }} />}
    </ListItem>
  );
};
export default NavItem;
