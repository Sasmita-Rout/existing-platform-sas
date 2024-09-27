import PrivateRoute from "../modules/PrivateRoute";
import { HomePage, LoginPage, PlatformProject, PageNotFound, NewProject } from "../pages";

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
      {
        path: "/NewProject",
        element: <NewProject />
      }
    ],
  },
  {
    path: "*",
    element: <PageNotFound />, // Handling invalid routes
  },
];
