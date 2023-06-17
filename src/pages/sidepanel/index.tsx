import React from "react";
import { createRoot } from "react-dom/client";
import SidePanel from "./SidePanel";
import "./index.css";

function init() {
  const appContainer = document.getElementById("idealcart-sidepanel");
  if (!appContainer) {
    throw new Error("Can not find #idealcart-sidepanel");
  }
  const root = createRoot(appContainer);
  root.render(<SidePanel />);
}

init();
