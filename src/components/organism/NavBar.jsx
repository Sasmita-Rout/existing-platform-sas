import React, { useState } from "react";
import { Drawer, List, Box, IconButton, Divider, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Outlet } from "react-router-dom";
import NavItem from "../molecules/NavItem";
import logo from "../../assets/images/logo.png";
import logo_header from "../../assets/images/accionlabs-icon.png";

const NAVIGATION = [
  { title: "Home", icon: <HomeIcon />, path: "/home" },
  { title: "PMO Dashboard", icon: <DashboardIcon />, path: "/pmo-dashboard" },
  { title: "Reports", icon: <BarChartIcon />, path: "/reports" },
  { title: "Platform Data", icon: <LayersIcon />, path: "/PlatformProject" },
  { title: "Value Board", icon: <ErrorOutlineIcon />, path: "/value-board" },
];

const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentPath = window.location.pathname;

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={isExpanded}
        PaperProps={{
          sx: {
            backgroundColor: "#5A646E",
            width: isExpanded ? 240 : 80,
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: isExpanded ? "flex-end" : "center",
            padding: "10px",
            backgroundColor: "#fafbfc"
          }}
        >
          <IconButton onClick={toggleDrawer}>
            {isExpanded ? (
              <MenuOpenIcon style={{ color: "black" }} />
            ) : (
              <MenuIcon style={{ color: "black" }} />
            )}
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <img
            src={isExpanded ? logo_header : logo}
            alt="Logo"
            style={{
              background: "white",
              width: isExpanded ? "250px" : "80px",
              height: isExpanded ? "auto" : "60px",
              transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
          />
        </Box>

        <List>
          {NAVIGATION.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              title={item.title}
              path={item.path}
              isExpanded={isExpanded}
              currentPath={currentPath}
            />
          ))}
        </List>

        <Divider />

        <List sx={{ marginTop: "auto" }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
          >
            <Avatar
              alt="User Avatar"
              src={"https://your-avatar-url.com/avatar.png"}
              sx={{
                width: isExpanded ? 56 : 32,
                height: isExpanded ? 56 : 32,
                transition: "width 0.3s ease-in-out",
              }}
            />
          </Box>

          <NavItem
            icon={<NotificationsIcon />}
            title="Notifications"
            path="#notifications"
            isExpanded={isExpanded}
            currentPath={currentPath}
          />

          <NavItem
            icon={<LogoutIcon />}
            title="Logout"
            path="#logout"
            isExpanded={isExpanded}
            currentPath={currentPath}
          />
        </List>
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: isExpanded ? 32 : 8,
          padding: 3,
          transition: "margin-left 0.3s ease-in-out",
          // overflowX: "hidden",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default NavBar;
