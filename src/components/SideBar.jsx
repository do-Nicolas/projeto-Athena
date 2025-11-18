import React from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import iconeTelaInicial from '../assets/icone-telainicial.png';
import iconeConfig from '../assets/icone-config.png';
import iconeEstatistica from '../assets/icone-estatistica.png';
import iconeAjuda from '../assets/icone-ajuda.png';
import iconeLivro from '../assets/icone-livro-Png.png';
import iconeConta from '../assets/icone-conta.png';
import iconeSair from '../assets/icone-sair.png';
import athenaLogo from '../assets/athena-logo.png';

const Sidebar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Deseja realmente sair da aplicação?"
    );

    if (!confirmLogout) return;

    await signOut();
    navigate("/bem-vindo");
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <img src={athenaLogo} alt="Athena Logo" />
      </div>

      {/* Menu principal */}
      <div className="menu">
        <NavLink to="/" end>
          <img src={iconeTelaInicial} alt="Home" className="menu-icon" />
          <div className="menuText">Tela inicial</div>
        </NavLink>

        <NavLink to="/estudar">
          <img src={iconeLivro} alt="Estudar" className="menu-icon" />
          <div className="menuText">Estudar</div>
        </NavLink>

        <NavLink to="/estatisticas">
          <img src={iconeEstatistica} alt="Estatísticas" className="menu-icon" />
          <div className="menuText">Estatísticas</div>
        </NavLink>

        <NavLink to="/configuracoes">
          <img src={iconeConfig} alt="Configurações" className="menu-icon" />
          <div className="menuText">Config.</div>
        </NavLink>

        <NavLink to="/ajuda">
          <img src={iconeAjuda} alt="Ajuda" className="menu-icon" />
          <div className="menuText">Ajuda</div>
        </NavLink>
      </div>

      {/* Menu inferior */}
      <div className="menu-bottom">
        <NavLink to="/conta">
          <img src={iconeConta} alt="Conta" className="menu-icon" />
          <div className="menuText">Conta</div>
        </NavLink>

        {/* Botão de sair substituindo o NavLink */}
        <button
          onClick={handleLogout}
          className="logout-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: 0
          }}
        >
          <img src={iconeSair} alt="Sair" className="menu-icon" />
          <div className="menuText">Sair</div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
