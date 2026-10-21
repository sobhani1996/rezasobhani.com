import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Pages are pre-rendered at build time; take over that HTML. 404.html has an empty root, so render from scratch.
const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
