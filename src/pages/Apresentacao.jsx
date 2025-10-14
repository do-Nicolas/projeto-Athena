import React from 'react'
import './Apresentacao.css';
import backgroundImg from '../assets/bgImage.jpg'
import { useClerk } from '@clerk/clerk-react';

const Apresentacao = () => {
  const { openSignIn } = useClerk();

  return (
    <div className="apresentacao-page">
      <div className="topBar">
        <h1>Effiecient Knowledge</h1>
        <button>entrar</button>
      </div>
      <div className="background-img">
        <img src={backgroundImg} alt="Imagem de fundo" />
        <div className="text-overlay">
          <h1>Entre no Athena</h1>
          <p>Athena te ajuda a organizar as suas sessões de estudo para manter o seu foco</p>
          <button onClick={() => openSignIn()}>crie sua conta</button>
        </div>
      </div>
    </div>
  )
}

export default Apresentacao