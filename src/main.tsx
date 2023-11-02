import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { Core } from "./core/Core";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Core />
  </BrowserRouter>
);
