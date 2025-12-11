import PrivateRoute from "../modules/PrivateRoute";
import {
  HomePage,
  PMODashboard,
  Reports,
  PlatformProject,
  ValueBoard,
  NewProject,
} from "../pages";
import { Navigate } from "react-router-dom";

export const appRoutes = [
  {
    path: "/",
    element: <Navigate to="/PlatformProject" replace />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/pmo-dashboard",
        element: <PMODashboard />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/PlatformProject",
        element: <PlatformProject />,
      },
      {
        path: "/value-board",
        element: <ValueBoard />,
      },
      {
        path: "/PlatformProject/NewProject",
        element: <NewProject />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
];
