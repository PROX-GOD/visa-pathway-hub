
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import F1VisaInfoPage from "./pages/F1VisaInfoPage";
import InterviewPrepPage from "./pages/InterviewPrepPage";
import VisaExperiencesPage from "./pages/VisaExperiencesPage";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import ShareExperiencePage from "./pages/ShareExperiencePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/f1-visa-info" element={<F1VisaInfoPage />} />
          <Route path="/interview-prep" element={<InterviewPrepPage />} />
          <Route path="/visa-experiences" element={<VisaExperiencesPage />} />
          <Route path="/visa-experiences/share" element={<ShareExperiencePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
