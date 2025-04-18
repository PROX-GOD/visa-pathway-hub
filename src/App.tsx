
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import F1VisaInfoPage from "./pages/F1VisaInfoPage";
import InterviewPrepPage from "./pages/InterviewPrepPage";
import VisaExperiencesPage from "./pages/VisaExperiencesPage";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import ShareExperiencePage from "./pages/ShareExperiencePage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import AdminElectionPage from "@/pages/AdminElectionPage";
import DashboardPage from "@/pages/DashboardPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import ShareTestimonialPage from "@/pages/ShareTestimonialPage";
import NoticePage from "@/pages/NoticePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ProfilePage from "@/pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/testimonials/share" element={<ShareTestimonialPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/notice/:slug" element={<NoticePage />} />
            <Route path="/admin-elections" element={<AdminElectionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
