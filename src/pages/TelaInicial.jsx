import React from "react";
import Calendar from '../components/Calendar'
import "./TelaInicial.css";
const TelaInicial = () => {
  return (
      <div className="main-content">
        <div className="telaInicial-page">
          <div className="cronograma-container">
            <h1>CRONOGRAMA</h1>
            </div>
          
          <Calendar/>
        </div>
        
    </div>

  );
};

export default TelaInicial;
