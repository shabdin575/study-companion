import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Subjects from "./pages/Subjects";
import Checklist from "./pages/Checklist";
import Prayer from "./pages/Prayer";
import Love from "./pages/Love";
import More from "./pages/More";
import Timer from "./pages/Timer";
import Gallery from "./pages/Gallery";
import Progress from "./pages/Progress";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

const ThemeInitializer = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeInitializer />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/prayer" element={<Prayer />} />
            <Route path="/love" element={<Love />} />
            <Route path="/more" element={<More />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
