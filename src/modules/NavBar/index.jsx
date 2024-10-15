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
import { googleLogout } from "@react-oauth/google";
import ConfirmationDialog from "../../components/molecules/ConfirmationDialog";
import theme from "../styles/theme";

const NAVIGATION = [
  { title: "Home", icon: <HomeIcon />, path: "/home" },
  { title: "PMO Dashboard", icon: <DashboardIcon />, path: "/pmo-dashboard" },
  { title: "Reports", icon: <BarChartIcon />, path: "/reports" },
  { title: "Platform Data", icon: <LayersIcon />, path: "/PlatformProject" },
  { title: "Value Board", icon: <ErrorOutlineIcon />, path: "/value-board" },
];

const NavBar = ({ onExpand }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { pmoUser, logout } = useUserStore();
  const handleLogout = () => {
    googleLogout();
    logout();
    navigate("/login");
  };

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
    onExpand(!isExpanded);
  };

  const handleNavItemClick = (path) => {
    navigate(path);
  };
  const handleLogoutClick = () => {
    setOpenDialog(true);
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
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: isExpanded ? "flex-end" : "center",
            padding: "10px",
            backgroundColor: "#fafbfc",
          }}
        >
          <img
            src={isExpanded ? logo_header : logo}
            alt="Logo"
            style={{
              background: "white",
              marginLeft: "8px",
              width: isExpanded ? "200px" : "40px",
              height: isExpanded ? "auto" : "30px",
              transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
          />
          <IconButton onClick={toggleDrawer}>
            {isExpanded ? (
              <MenuOpenIcon style={{ color: "black" }} />
            ) : (
              <MenuIcon style={{ color: "black" }} />
            )}
          </IconButton>
        </Box> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
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
              <MenuOpenIcon style={{ color: theme.palette.black.main, }} />
            ) : (
              <MenuIcon style={{ color: theme.palette.black.main, }} />
            )}
          </IconButton>
        </Box>

        <List>
          {NAVIGATION.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              title={item.title}
              path={item.path}
              isExpanded={isExpanded}
              isActive={location.pathname === item.path}
              onClick={() => handleNavItemClick(item.path)}
            />
          ))}
        </List>
        <Divider />
        <List sx={{ marginTop: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
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
            {pmoUser?.name || "Guest"}
          </Typography>

          <NavItem
            icon={<NotificationsIcon />}
            title="Notifications"
            path="#notifications"
            isExpanded={isExpanded}
            isActive={false}
            onClick={() => {}}
          />

          <NavItem
            icon={<LogoutIcon />}
            title="Logout"
            path="#logout"
            isExpanded={isExpanded}
            isActive={false}
            onClick={handleLogoutClick}
          />
        </List>
      </Drawer>
      <ConfirmationDialog
        open={openDialog}
        onClose={setOpenDialog}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        content="Are you sure you want to logout?"
      />
    </Box>
  );
};
export default NavBar;
