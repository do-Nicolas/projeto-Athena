import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import "./Login.css"; 


const EsquecerSenha = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Redefinir Senha - ATHƎNA";
  }, []);

  const handleRedefinir = (e) => {
    e.preventDefault();
    navigate("/"); 
  };

  return (
    <div className="wrapper_rdf">
      <div className="form-header">
        <div className="titles">
          <div className="titulo-redefinir">ATHƎNA</div>
        </div>
      </div>

      <form className="redefinir-form" autoComplete="off" onSubmit={handleRedefinir}>
        <div className="input-box">
          <input
            type="email"
            className="input-field"
            id="rec-email"
            required
          />
          <label htmlFor="rec-email" className="label">
            Email
          </label>
          <i className="bx bx-envelope icon"></i>
        </div>

        <div className="input-box">
               <Link to = '/'>
          <button type="submit" className="btn-submit">
               
                   Redefinir senha
                  
   
          </button>
           </Link>
        </div>
      </form>
    </div>
  );
};

export default EsquecerSenha;
