import { createBrowserRouter } from "react-router-dom";

import { Login } from "./pages/Login";
import { Farmers } from "./pages/Farmers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/agricultores",
    element: <Farmers />,
  },
]);
