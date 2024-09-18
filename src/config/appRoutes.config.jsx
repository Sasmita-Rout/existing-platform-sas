import PrivateRoute from "../modules/PrivateRoute";
import { HomePage, LoginPage, PlatformProject } from "../pages";

export const appRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
    index: true,
  },
  {
    element: <PrivateRoute />, // Protected routes
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/PlatformProject",
        element: <PlatformProject />,
      },
    ],
  },
  {
    path: "*",
    element: <p>Page not found</p>, // Handling invalid routes
  },
];
