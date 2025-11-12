import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Web3Provider } from "./contexts/Web3Context";
import Home from "./pages/Home";
import NakamaOS from "./pages/NakamaOS";
import Tunova from "./pages/Tunova";
import GenesisMint from "./pages/GenesisMint";
import LaTaberna from "./pages/LaTaberna";
import ZonaRecreativa from "./pages/ZonaRecreativa";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/nakama-os"} component={NakamaOS} />
      <Route path={"/tunova"} component={Tunova} />
      <Route path={"/genesis-mint"} component={GenesisMint} />
      <Route path={"/la-taberna"} component={LaTaberna} />
      <Route path={"/zona-recreativa"} component={ZonaRecreativa} />
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
      <Web3Provider>
        <ThemeProvider
          defaultTheme="dark"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </Web3Provider>
    </ErrorBoundary>
  );
}

export default App;
