import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; // Collapse icon
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; // Expand icon
import logo from "../../assets/images/logo.png";
import logo_header from "../../assets/images/accionlabs-icon.png";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";

const avatarUrl = "https://your-avatar-url.com/avatar.png";

const NAVIGATION = [
  {
    segment: "home",
    title: "Home",
    icon: <HomeIcon />,
    path: "/home",
  },
  {
    segment: "pmo-dashboard",
    title: "PMO Dashboard",
    icon: <DashboardIcon />,
    path: "/pmo-dashboard",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    path: "/reports",
  },
  {
    segment: "platform-data",
    title: "Platform Data",
    icon: <LayersIcon />,
    path: "/platform-data",
  },
  {
    segment: "value-board",
    title: "Value Board",
    icon: <ErrorOutlineIcon />,
    path: "/value-board",
  },
];

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export function DashboardLayoutBasic(props) {
  const [pathname, setPathname] = React.useState("/PlatformProject");
  const [isExpanded, setIsExpanded] = React.useState(false);

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
            width: isExpanded ? 240 : 72,
            transition: "width 0.3s ease-in-out",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: isExpanded ? "flex-end" : "center",
            padding: "10px",
            backgroundColor: "#fafbfc",
          }}
        >
          <IconButton onClick={toggleDrawer}>
            {isExpanded ? (
              <ChevronLeftIcon style={{ color: "black" }} />
            ) : (
              <ChevronRightIcon style={{ color: "black" }} />
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
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Box>

        <List>
          {NAVIGATION.map((item, index) => (
            <ListItem
              button
              key={item.segment}
              sx={{
                "&:hover": {
                  backgroundColor: "#e57373", // Hover color - pinkish/redish tone as in your image
                },
                backgroundColor:
                  pathname === item.segment ? "#ef5350" : "transparent", // Selected state color
              }}
              onClick={() => setPathname(item.segment)}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              {isExpanded && (
                <ListItemText primary={item.title} sx={{ color: "white" }} />
              )}
            </ListItem>
          ))}
        </List>

        <Divider />

        <List sx={{ marginTop: "auto" }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
          >
            <Avatar
              alt="User Avatar"
              src={avatarUrl}
              sx={{
                width: isExpanded ? 56 : 32,
                height: isExpanded ? 56 : 32,
                transition: "width 0.3s ease-in-out",
              }}
            />
          </Box>
          <ListItem button>
            <ListItemIcon>
              <NotificationsIcon style={{ color: "white" }} />
            </ListItemIcon>
            {isExpanded && (
              <ListItemText primary="Notifications" sx={{ color: "white" }} />
            )}
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LogoutIcon style={{ color: "white" }} />
            </ListItemIcon>
            {isExpanded && (
              <ListItemText primary="Logout" sx={{ color: "white" }} />
            )}
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <DemoPageContent pathname={pathname} />
      </Box>
    </Box>
  );
}

export default DashboardLayoutBasic;
