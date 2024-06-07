import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmergenciesPage from "./pages/EmergenciesPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChangeTariffPage from "./pages/ChangeTariffPage";
import AddCounterNumbersPage from "./pages/AddCounterNumbersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <HomePage /> },
      { path: "/emergencies", element: <EmergenciesPage /> },
      { path: "/user", element: <UserPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/change-tariff", element: <ChangeTariffPage /> },
      {
        path: "/admin",
        children: [
          { index: true, element: <div>adminpanel</div> },
          {
            path: "/admin/dashboard",
            element: <div>Dashboard</div>,
          },
        ],
      },
      { path: "/recieve-numbers", element: <AddCounterNumbersPage /> },
    ],
  },
]);
