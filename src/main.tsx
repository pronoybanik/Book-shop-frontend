import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={MainRoutes}>
      <App />
    </RouterProvider>
  </StrictMode>
);
