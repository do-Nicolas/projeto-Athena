import React from 'react'
import "./Login.css";
const Login = () => {
  return (
    <>
     <div className="main-content">
    <div className="login-page">
   
     <div className="wrapper">
      <div className="form-header">
        <div className="titles">
          <div className="title-login">ATHƎNA</div>
          <div className="title-register">ATHƎNA</div>
        </div>
      </div>

      {/* Login */}
      <form className="login-form" autoComplete="off">
        <div className="input-box">
          <input type="text" className="input-field" id="log-email" required />
          <label htmlFor="log-email" className="label">Email</label>
          <i className="bxr bx-envelope icon"></i>
        </div>
        <div className="input-box">
          <input type="password" className="input-field" id="log-password" required />
          <label htmlFor="log-password" className="label">Senha</label>
          <i className="bxr bx-lock icon"></i>
        </div>
        <div className="form-cols">
          <div className="col-1"></div>
          <div className="col-2">
            <a href="#">Esqueceu a senha?</a>
          </div>
        </div>
        <div className="input-box">
          <button type="submit" className="btn-submit" id="LoginBtn">
            Login
            <i className="bx bx-arrow-out-left-square-half bx-flip-horizontal"></i>
          </button>
        </div>
        <div className="switch-form">
          <span>
            Não possui uma conta?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); /* registerFunction() */ }}>
              Cadastre-se
            </a>
          </span>
        </div>
      </form>

      {/* Cadastro */}
      <form className="register-form" autoComplete="off">
        <div className="input-box">
          <input type="text" className="input-field" id="reg-nome" required />
          <label htmlFor="reg-nome" className="label">Nome de usuário</label>
          <i className="bx bx-user icon"></i>
        </div>
        <div className="input-box">
          <input type="text" className="input-field" id="reg-email" required />
          <label htmlFor="reg-email" className="label">Email</label>
          <i className="bxr bx-envelope icon"></i>
        </div>
        <div className="input-box">
          <input type="password" className="input-field" id="reg-senha" required />
          <label htmlFor="reg-senha" className="label">Senha</label>
          <i className="bxr bx-lock icon"></i>
        </div>
        <div className="form-cols">
          <div className="col-1">
            <input type="checkbox" id="agree" />
            <label htmlFor="agree"> Eu concordo com os termos e condições </label>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="input-box">
          <button type="submit" className="btn-submit" id="CadastrarBtn">
            Cadastrar
            <i className="bx bx-arrow-out-left-square-half bx-flip-horizontal"></i>
          </button>
        </div>
        <div className="switch-form">
          <span>
            Já possui uma conta?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); /* loginFunction() */ }}>
              Login
            </a>
          </span>
        </div>
      </form>
    </div>

    </div>
    </div>
    </>
  )
}

export default Login