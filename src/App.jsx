import { Route, Routes } from 'react-router-dom'
import TelaInicial from './pages/TelaInicial'
import Revisar from './pages/Revisar'
import Conta from './pages/Conta'
import Ajuda from './pages/Ajuda'
import Configuracoes from './pages/Configuracoes'
import Estatisticas from './pages/Estatisticas'
import SideBar from './components/SideBar'
import EsquecerSenha from './pages/esquecerSenha'

import './App.css'  

function App() {
  return (
    <div className="app">
      <SideBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/revisar" element={<Revisar />} />
          <Route path="/conta" element={<Conta />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
          <Route path="/ajuda" element={<Ajuda />} />          
          <Route path="/EsquecerSenha" element={<EsquecerSenha />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
