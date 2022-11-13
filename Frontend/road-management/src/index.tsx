import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AddRoadPresenter from "./presenters/AddRoadPresenter/AddRoadPresenter";
import MapPresenter from "./presenters/MapPresenter/MapPresenter";
import DashboardView from "./views/Dashboard/Dashboard";
import RegisterCarView from "./views/RegisterCar/RegisterCarView";

const router = createBrowserRouter([
  { path: "/", element: <DashboardView /> },
  { path: "/registerCar", element: <RegisterCarView /> },
  { path: "/map", element: <MapPresenter /> },
  { path: "/addRoad", element: <AddRoadPresenter /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
);
