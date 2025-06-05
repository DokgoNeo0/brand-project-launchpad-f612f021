
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import Navbar from "./components/Navbar";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import ProjectLibrary from "./pages/ProjectLibrary";
import Explora from "./pages/Explora";
import QueEsUGC from "./pages/QueEsUGC";
import Propuestas from "./pages/Propuestas";
import Favoritos from "./pages/Favoritos";
import MisPagos from "./pages/MisPagos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ProjectProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/crear-proyecto" element={<CreateProject />} />
                <Route path="/mis-proyectos" element={<ProjectLibrary />} />
                <Route path="/explora" element={<Explora />} />
                <Route path="/que-es-ugc" element={<QueEsUGC />} />
                <Route path="/propuestas" element={<Propuestas />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/mis-pagos" element={<MisPagos />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ProjectProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
