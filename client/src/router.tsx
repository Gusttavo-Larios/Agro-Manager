import { createBrowserRouter } from "react-router-dom";

import { Login } from "./pages/Login";
import { Farmers } from "./pages/Farmers";
import { Farmer } from "./pages/Farmer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/agricultores",
    element: <Farmers />,
  },
  {
    path: "/agricultor/:farmerId",
    element: <Farmer />,
  },
  {
    path: "/agricultor/novo",
    element: <Farmer />,
  },
]);
