// Build-time renderer: scripts/postbuild.mjs calls render() for every page so the HTML
// that search engines and link previews receive already contains the full text.
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export { strings } from "./content/strings";
export { languages } from "./content/languages";

export function render(path: string) {
  return renderToString(
    <Router ssrPath={path}>
      <App />
    </Router>,
  );
}
