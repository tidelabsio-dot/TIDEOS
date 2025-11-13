import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Waitlist from "./pages/Waitlist";
import LaTaberna from "./pages/LaTaberna";
import GenesisMint from "./pages/GenesisMint";
import Crowdfunding from "./pages/Crowdfunding";
import ZonaRecreativa from "./pages/ZonaRecreativa";
import UserProfile from "./pages/UserProfile";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/waitlist"} component={Waitlist} />
      <Route path={"/taberna"} component={LaTaberna} />
      <Route path={"/mint"} component={GenesisMint} />
      <Route path={"/crowdfunding"} component={Crowdfunding} />
      <Route path={"/games"} component={ZonaRecreativa} />
      <Route path={"/profile"} component={UserProfile} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
