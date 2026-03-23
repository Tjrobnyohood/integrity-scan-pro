/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  APP.TSX — Root Application Component & Route Configuration    ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  ROUTES:                                                       ║
 * ║  /              → Landing.tsx     (public landing page)        ║
 * ║  /dashboard     → Index.tsx       (client portal / dashboard)  ║
 * ║  /proposals     → Proposals.tsx   (proposal management)        ║
 * ║  /privacy       → PrivacyPolicy   (legal: privacy policy)     ║
 * ║  /terms         → TermsOfService  (legal: terms of service)   ║
 * ║  /roe-generator → ROEGenerator    (ROE form → .md download)   ║
 * ║  *              → NotFound.tsx    (404 page)                   ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  PROVIDERS (wrapping all routes):                              ║
 * ║  - QueryClientProvider: React Query for data fetching/caching  ║
 * ║  - TooltipProvider: Radix tooltip context                      ║
 * ║  - Toaster + Sonner: Toast notification systems                ║
 * ║  - BrowserRouter: React Router for client-side routing         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing.tsx";
import Index from "./pages/Index.tsx";
import Proposals from "./pages/Proposals.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import ROEGenerator from "./pages/ROEGenerator.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/roe-generator" element={<ROEGenerator />} />
          <Route path="/login" element={<Login />} />

          {/* Internal / authenticated pages */}
          <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/proposals" element={<ProtectedRoute><Proposals /></ProtectedRoute>} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
