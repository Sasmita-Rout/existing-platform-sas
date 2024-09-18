import { RouterProvider, createHashRouter } from "react-router-dom";
import { appRoutes } from "./config/appRoutes.config";

function App() {
  const router = createHashRouter(appRoutes);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
