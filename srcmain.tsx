import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Fleet from "./pages/Fleet";
import Device from "./pages/Device";
import Alarms from "./pages/Alarms";
import Admin from "./pages/Admin";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Fleet /> },
      { path: "device/:id", element: <Device /> },
      { path: "alarms", element: <Alarms /> },
      { path: "admin", element: <Admin /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
