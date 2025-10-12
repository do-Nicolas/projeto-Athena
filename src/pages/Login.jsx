import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/TelaInicial"); 
  };

  const handleRegister = (e) => {
    e.preventDefault();

    navigate("/TelaInicial");
  };

  return (
    <div className="main-content">
      <div className="login-page">
        <div className={`wrapper ${isRegistering ? "active" : ""}`}>
          <div className="form-header">
            <div className="titles">
              <div
                className="titulo-login"
                style={{
                  opacity: isRegistering ? 0 : 1,
                  top: isRegistering ? "-60px" : "50%",
                }}
              >
                ATHƎNA
              </div>
              <div
                className="titulo-registro"
                style={{
                  opacity: isRegistering ? 1 : 0,
                  top: isRegistering ? "50%" : "50px",
                }}
              >
                ATHƎNA
              </div>
            </div>
          </div>

          {/* Formulário de Login */}
          <form
            className="login-form"
            autoComplete="off"
            style={{
              left: isRegistering ? "-50%" : "50%",
              opacity: isRegistering ? 0 : 1,
            }}
            onSubmit={handleLogin}
          >
            <div className="input-box">
              <input type="text" className="input-field" id="log-email" required />
              <label htmlFor="log-email" className="label">Email</label>
              <i className="bx bx-envelope icon"></i>
            </div>
            <div className="input-box">
              <input type="password" className="input-field" id="log-password" required />
              <label htmlFor="log-password" className="label">Senha</label>
              <i className="bx bx-lock icon"></i>
            </div>
            <div className="form-cols">
              <div className="col-1"></div>
              <div className="col-2">
                <Link to="/EsquecerSenha">Esqueceu a senha?</Link>
              </div>
            </div>
            <div className="input-box">
              <button type="submit" className="btn-submit">
                Login
                <i className="bx bx-arrow-out-left-square-half bx-flip-horizontal"></i>
              </button>
            </div>
            <div className="switch-form">
              <span>
                Não possui uma conta?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); handleToggleForm(); }}>
                  Cadastre-se
                </a>
              </span>
            </div>
          </form>

          {/* Formulário de Cadastro */}
          <form
            className="register-form"
            autoComplete="off"
            style={{
              left: isRegistering ? "50%" : "150%",
              opacity: isRegistering ? 1 : 0,
            }}
            onSubmit={handleRegister}
          >
            <div className="input-box">
              <input type="text" className="input-field" id="reg-nome" required />
              <label htmlFor="reg-nome" className="label">Nome de usuário</label>
              <i className="bx bx-user icon"></i>
            </div>
            <div className="input-box">
              <input type="text" className="input-field" id="reg-email" required />
              <label htmlFor="reg-email" className="label">Email</label>
              <i className="bx bx-envelope icon"></i>
            </div>
            <div className="input-box">
              <input type="password" className="input-field" id="reg-senha" required />
              <label htmlFor="reg-senha" className="label">Senha</label>
              <i className="bx bx-lock icon"></i>
            </div>
            <div className="form-cols">
              <div className="col-1">
                <input type="checkbox" id="agree" />
                <label htmlFor="agree"> Eu concordo com os termos e condições </label>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="input-box">
              <button type="submit" className="btn-submit">
                Cadastrar
                <i className="bx bx-arrow-out-left-square-half bx-flip-horizontal"></i>
              </button>
            </div>
            <div className="switch-form">
              <span>
                Já possui uma conta?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); handleToggleForm(); }}>
                  Login
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;