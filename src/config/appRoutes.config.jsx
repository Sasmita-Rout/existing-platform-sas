import NavBar from "../modules/NavBar";
import PrivateRoute from "../modules/PrivateRoute";
import {
  HomePage,
  LoginPage,
  PMODashboard,
  Reports,
  PlatformProject,
  ValueBoard,
  PageNotFound,
} from "../pages";

export const appRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
    index: true,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <NavBar />,
        children: [
          {
            path: "home",
            element: <HomePage />,
          },
          {
            path: "pmo-dashboard",
            element: <PMODashboard />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "PlatformProject",
            element: <PlatformProject />,
          },
          {
            path: "value-board",
            element: <ValueBoard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
