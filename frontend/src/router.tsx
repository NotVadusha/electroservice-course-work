import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmergenciesPage from "./pages/EmergenciesPage";
import UserPage from "./pages/UserPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <HomePage /> },
      { path: "/emergencies", element: <EmergenciesPage /> },
      { path: "/user", element: <UserPage /> },
    ],
  },
]);
