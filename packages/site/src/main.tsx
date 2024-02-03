import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { BrowserRouter as Router } from "react-router-dom";
import { ReloadPrompt } from "@/components";
import "@bbki.ng/components/style";
import App from "./app";
import "./main.css";

const container = document.getElementById("root") as Element;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <ReloadPrompt />
      <App />
      <Toaster />
    </Router>
  </React.StrictMode>
);
