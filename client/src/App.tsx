import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { languageFromPath, languageInfo } from "./content/languages";
import Home from "./pages/Home";
import About from "./pages/About";
import Research from "./pages/Research";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";

// Old links used hash routing (/#/about); send them to the real path.
function useLegacyHashRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => {
    const { hash } = window.location;
    if (hash.startsWith("#/")) navigate(hash.slice(1), { replace: true });
  }, [navigate]);
}

function SiteRouter() {
  const [location] = useLocation();
  const language = languageFromPath(location);
  useLegacyHashRedirect();

  // New page starts at the top, unless the link points at a section (#id) on it.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id && !id.startsWith("/") ? document.getElementById(id) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location]);

  return (
    <LanguageProvider language={language}>
      <Router base={languageInfo(language).prefix}>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/research" component={Research} />
            <Route path="/publications" component={Publications} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <SiteRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
