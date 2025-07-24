import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LeaveForm from "./pages/LeaveForm";
import AbsenceForm from "./pages/AbsenceForm";
import ReturnToWorkForm from "./pages/ReturnToWorkForm";
import Evaluation from "./pages/Evaluation";
import Records from "./pages/Records";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Login page without layout */}
          <Route path="/" element={<Login />} />
          
          {/* Protected routes with layout */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/evaluation" element={<Layout><Evaluation /></Layout>} />
          <Route path="/leave-form" element={<Layout><LeaveForm /></Layout>} />
          <Route path="/absence-form" element={<Layout><AbsenceForm /></Layout>} />
          <Route path="/return-to-work" element={<Layout><ReturnToWorkForm /></Layout>} />
          <Route path="/records" element={<Layout><Records /></Layout>} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
