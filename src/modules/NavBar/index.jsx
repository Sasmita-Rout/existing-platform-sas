import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  Box,
  IconButton,
  Divider,
  Avatar,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import logo from "../../assets/images/logo.png";
import logo_header from "../../assets/images/accionlabs-icon.png";
import NavItem from "./NavItem";
import { useUserStore } from "../../zustand/index";
import { DialogBox } from "../../components/molecules";
import { grey } from "@mui/material/colors";
import theme from "../styles/theme";

const NAVIGATION = [
  // { title: "Home", icon: <HomeIcon />, path: "/home" },
  // { title: "PMO Dashboard", icon: <DashboardIcon />, path: "/pmo-dashboard" },
  // { title: "Reports", icon: <BarChartIcon />, path: "/reports" },
  { title: "Platform Data", icon: <LayersIcon />, path: "/PlatformProject" },
  { title: "Portfolio", icon: <LayersIcon />, path: 'https://sasmita-rout.github.io/pmo-frontend-sas/' },
  // { title: "Value Board", icon: <ErrorOutlineIcon />, path: "/value-board" },
];

const NavBar = ({ setIsExpanded, isExpanded }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = sessionStorage.getItem("userEmail");
  const { pmoUser } = useUserStore();

  // 👉 toggle drawer clean fix
  const toggleDrawer = () => {
    setIsExpanded((prev) => !prev);
  };

  // 👉 Navigation handling (internal & external)
  const handleNavItemClick = (path) => {
    if (path.startsWith("http")) {
      window.location.href = path; // external link
    } else {
      navigate(path); // internal route
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={isExpanded}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.gray.main,
            width: isExpanded ? 240 : 80,
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
          },
        }}
      >
        {/* Logo + Menu */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.light.main,
          }}
        >
          <img
            src={isExpanded ? logo_header : logo}
            alt="Logo"
            style={{
              background: "white",
              width: isExpanded ? "250px" : "50px",
              height: isExpanded ? "auto" : "35px",
              transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
          />

          <IconButton onClick={toggleDrawer}>
            {isExpanded ? (
              <MenuOpenIcon style={{ color: theme.palette.black.main }} />
            ) : (
              <MenuIcon style={{ color: theme.palette.black.main }} />
            )}
          </IconButton>
        </Box>

        {/* Navigation */}
        <List>
          {NAVIGATION.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              title={item.title}
              path={item.path}
              isExpanded={isExpanded}
              isActive={!item.path.startsWith("http") && location.pathname === item.path}
              onClick={() => handleNavItemClick(item.path)}
            />
          ))}
        </List>

        <Divider />

        {/* User Info */}
        <List sx={{ marginTop: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Avatar
              src={pmoUser?.picture || "default-avatar-url.png"}
              alt="User Avatar"
              sx={{
                width: isExpanded ? 56 : 32,
                height: isExpanded ? 56 : 32,
                borderRadius: "50%",
                transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
              }}
            />
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.white.main,
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {userEmail ? pmoUser?.name || userEmail : "Guest"}
          </Typography>

          <NavItem
            icon={<NotificationsIcon />}
            title="Notifications"
            path="#notifications"
            isExpanded={isExpanded}
            isActive={false}
            onClick={() => {}}
          />
        </List>
      </Drawer>
    </Box>
  );
};

export default NavBar;