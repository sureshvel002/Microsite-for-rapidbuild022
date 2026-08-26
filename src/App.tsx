import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import CompanyChooser from "./pages/CompanyChooser.tsx";
import CompanyHome from "./pages/CompanyHome.tsx";
import DeepResearch from "./pages/DeepResearch.tsx";
import Prompts from "./pages/Prompts.tsx";
import ChallengeCards from "./pages/ChallengeCards.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

// Everything below `/c/:companyId` is scoped to one AFM company: its context
// pack, its challenge cards and its prompts. `/` is the company chooser.
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<CompanyChooser />} />
          <Route path="/c/:companyId" element={<CompanyHome />} />
          <Route path="/c/:companyId/deep-research" element={<DeepResearch />} />
          <Route
            path="/c/:companyId/challenge-cards"
            element={<ChallengeCards />}
          />
          <Route path="/c/:companyId/prompts" element={<Prompts />} />
          {/* Links from the single-company version of this app. */}
          <Route path="/deep-research" element={<Navigate to="/" replace />} />
          <Route path="/challenge-cards" element={<Navigate to="/" replace />} />
          <Route path="/prompts" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
