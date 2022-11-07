import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AddRoadPresenter from "./presenters/AddRoadPresenter/AddRoadPresenter";
import MapPresenter from "./presenters/MapPresenter/MapPresenter";

const router = createBrowserRouter([
  { path: "/", element: <MapPresenter /> },
  { path: "/addRoad", element: <AddRoadPresenter /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  </React.StrictMode>
);
