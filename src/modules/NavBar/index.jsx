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
  { title: "Portfolio", icon: <LayersIcon />, path: "/portfolio" },
  // { title: "Value Board", icon: <ErrorOutlineIcon />, path: "/value-board" },
];

const NavBar = ({ setIsExpanded, isExpanded }) => {
  const [openPlatFormReport, setPlatFormReport] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pmoUser, logout } = useUserStore();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
    isExpanded(!isExpanded);
  };

  const handleNavItemClick = (path) => {
    navigate(path);
  };
  const handleLogoutClick = () => {
    setPlatFormReport(true);
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
      <DialogBox
        size="xs"
        actions={true}
        buttonAlignment="center"
        openDialog={openPlatFormReport}
        closeDialog={() => setPlatFormReport(false)}
      >
        <DialogTitle sx={{ textAlign: "center", color: "#D94A56" }}>
          Logout Confirmation
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", alignItems: "center" }}>
          Are you sure you want to logout?
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: `${grey[600]}`,
              borderColor: `${grey[400]}`,
              fontWeight: "bold",
              textTransform: "none",
              alignItems: "center",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </DialogBox>
    </Box>
  );
};
export default NavBar;
