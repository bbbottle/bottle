import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { BrowserRouter as Router } from "react-router-dom";
import { ReloadPrompt } from "@/components";
import App from "./app";
import "./main.css";
import Logger from "@/components/Logger";

export const RenderBlogInto = (ele: Element) => {
  const root = createRoot(ele);
  root.render(
    <React.StrictMode>
      <Router>
        <App />
        <Toaster />
        <Logger />
        <ReloadPrompt />
      </Router>
    </React.StrictMode>
  );
};
