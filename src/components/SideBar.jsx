import React from "react";
import { NavLink } from "react-router-dom"; 
import "./Sidebar.css";
import iconeTelaInicial from '../assets/icone-telainicial.png';
import iconeConfig from '../assets/icone-config.png';
import iconeEstatistica from '../assets/icone-estatistica.png';
import iconeAjuda from '../assets/icone-ajuda.png';
import iconeLivro from '../assets/icone-livro-Png.png';
import iconeConta from '../assets/icone-conta.png';
import iconeSair from '../assets/icone-sair.png';
import athenaLogo from '../assets/athena-logo.png';
import { useClerk, useUser } from "@clerk/clerk-react";






const Sidebar = () => {
  const {user} = useUser();
  const {openSignIn} = useClerk();
  
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
        <div className="menuText">
          Tela inicial
        </div>
        </NavLink>
        <NavLink to="/revisar">
          <img src={iconeLivro} alt="Revisar" className="menu-icon"/>
          <div className="menuText">
          Revisar
          </div>
        </NavLink>
        <NavLink to="/estatisticas">
          <img src={iconeEstatistica} alt="Estatísticas" className="menu-icon"/>
          <div className="menuText">
          Estatísticas
          </div>
        </NavLink>
        <NavLink to="/configuracoes">
          <img src={iconeConfig} alt="Configurações" className="menu-icon"/>
          <div className="menuText">
          Config.
          </div>
        </NavLink>
        <NavLink to="/ajuda">
          <img src={iconeAjuda} alt="Ajuda"className="menu-icon" />
          <div className="menuText">
          Ajuda
          </div>
        </NavLink>
      </div>

      {/* Menu inferior */}
      <div className="menu-bottom">
        <NavLink to="/conta">
          <img src={iconeConta} alt="Conta" className="menu-icon"/>
          <div className="menuText">
          Conta
          </div>
        </NavLink>
        <NavLink to="/sair" className="logout">
          <img src={iconeSair} alt="Sair" className="menu-icon"/>
          <div className="menuText">
          Sair
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
