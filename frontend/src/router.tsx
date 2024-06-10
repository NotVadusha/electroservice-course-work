import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmergenciesPage from "./pages/EmergenciesPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChangeTariffPage from "./pages/ChangeTariffPage";
import AddCounterNumbersPage from "./pages/AddCounterNumbersPage";
import AdminPanel from "./pages/AdminPanelPage";
import AdminDashboardsPage from "./pages/AdminDashboardsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/emergencies",
        children: [
          {
            index: true,
            element: <EmergenciesPage />,
          },
          {
            path: "create",
            element: <div>create emergency</div>,
          },
        ],
      },
      { path: "/user", element: <UserPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/change-tariff", element: <ChangeTariffPage /> },
      {
        path: "/admin",
        children: [
          { index: true, element: <AdminPanel /> },
          {
            path: "/admin/dashboard",
            element: <AdminDashboardsPage />,
          },
        ],
      },
      { path: "/receive-numbers", element: <AddCounterNumbersPage /> },
    ],
  },
]);
