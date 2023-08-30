import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import TambahBarang from "./pages/TambahBarang";
import UpdateBarang from "./pages/UpdateBarang";
import Login from "./pages/Login";
import Daftar from "./pages/Daftar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/tambah-barang",
    element: <TambahBarang />,
  },
  {
    path: "/update-barang/:id",
    element: <UpdateBarang />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/daftar",
    element: <Daftar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
