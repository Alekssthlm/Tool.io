import { Navigate, createBrowserRouter, createHashRouter } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ToDoPage from "./pages/ToDoPage";
import WeatherPage from "./pages/WeatherPage";
import SiteWrap from "./pages/SiteWrap";
import CalendarPage from "./pages/CalendarPage";
import UnitConverterPage from "./pages/UnitConverterPage";

export const router = createHashRouter([
  {
    element: <SiteWrap />,
    children: [
      { path: "/", element: <Welcome /> },
      { path: "/task-manager", element: <ToDoPage /> },
      { path: "/weather", element: <WeatherPage /> },
      { path: "/calendar", element: <CalendarPage /> },
      { path: "/unit-converter", element: <UnitConverterPage /> },
      { path: "/*", element: <Navigate to="/" /> }
    ],
  },
]);
