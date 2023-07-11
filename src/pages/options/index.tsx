import React from "react";
import { createRoot } from "react-dom/client";
import Options from "@pages/options/Options";
import "@pages/options/index.css";

function init() {
  const appContainer = document.querySelector("#idealcart-options");
  if (!appContainer) {
    throw new Error("Can not find #idealcart-options");
  }
  const root = createRoot(appContainer);
  root.render(<Options />);
}

init();
