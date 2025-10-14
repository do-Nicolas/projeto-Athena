import { Route, Routes, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import TelaInicial from "./pages/TelaInicial";
import Revisar from "./pages/Revisar";
import Conta from "./pages/Conta";
import Ajuda from "./pages/Ajuda";
import Configuracoes from "./pages/Configuracoes";
import Estatisticas from "./pages/Estatisticas";
import Apresentacao from "./pages/Apresentacao";
import SideBar from "./components/SideBar";

import "./App.css";

function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    window.location.replace("/bem-vindo");
    return null;
  }

  return children;
}

function App() {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  const isApresentacao = location.pathname === "/bem-vindo";
  if(isApresentacao){
    return(
      <div className="app">
          <Routes>
            <Route path="/bem-vindo" element={<Apresentacao />} />
          </Routes>
        </div>
    );
  }

  const showSidebar = isLoaded && isSignedIn && !isApresentacao;

  return (
    <div className="app">
      {showSidebar && <SideBar />}

      <div className="main-content">
        <Routes>
          {/* Página pública */}
          <Route path="/bem-vindo" element={<Apresentacao />} />

          {/* Rotas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TelaInicial />
              </ProtectedRoute>
            }
          />
          <Route
            path="/revisar"
            element={
              <ProtectedRoute>
                <Revisar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conta"
            element={
              <ProtectedRoute>
                <Conta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <ProtectedRoute>
                <Configuracoes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/estatisticas"
            element={
              <ProtectedRoute>
                <Estatisticas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ajuda"
            element={
              <ProtectedRoute>
                <Ajuda />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
