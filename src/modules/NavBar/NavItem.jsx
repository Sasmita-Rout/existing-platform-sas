import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import theme from "../styles/theme";
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
          backgroundColor: theme.palette.lightGray.main,
        },
        backgroundColor: isActive ? "#e57373" : "transparent",
        color: isActive ? theme.palette.white.main : "inherit",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <ListItemIcon sx={{ color: theme.palette.white.main }}>{icon}</ListItemIcon>
      {isExpanded && <ListItemText primary={title} sx={{ color: theme.palette.white.main }} />}
    </ListItem>
  );
};
export default NavItem;
