import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Research from "./pages/Research";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";

function SiteRouter() {
  return (
    <Router hook={useHashLocation}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/research" component={Research} />
          <Route path="/publications" component={Publications} />
          <Route path="/contact" component={Contact} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light">
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <SiteRouter />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
