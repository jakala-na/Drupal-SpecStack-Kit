import { createRoot } from "react-dom/client";
import { DrupalRenderer, blocks } from "@specstack/ui";

function mountReactApp() {
  let reactAppElement = document.getElementById("react-app");

  if (!reactAppElement) {
    reactAppElement = document.createElement("div");
    reactAppElement.id = "react-app";
    document.body.appendChild(reactAppElement);
  }

  createRoot(reactAppElement).render(<DrupalRenderer blocks={blocks} />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountReactApp);
} else {
  mountReactApp();
}
