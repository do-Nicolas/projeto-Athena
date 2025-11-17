import React, { useState } from 'react';
import './Ajuda.css';

const perguntas = [
  {
    titulo: "Como devo usar o aplicativo?",
    resposta: "O aplicativo foi pensado para que você o utilizasse como um auxiliar nos estudos. Funciona assim: você estuda o conteúdo, cria flashcards e, depois, a gente de ajuda a revisar todo esse conteúdo!",
  },
  {
    titulo: "Flashcards?",
    resposta: "Sim! Flashcards são cartões de estudo que ajudam na memorização.",
  },
  {
    titulo: "Como o aplicativo funciona?",
    resposta: "Ao criar uma matéria, você pode definir um plano de estudos e uma data de conclusão. A partir disso, o aplicativo organiza suas sessões de estudo e revisões automaticamente. Fácil, né?",
  },
  {
    titulo: "Como revisar?",
    resposta: "Para revisar, vá até a seção 'Estudar', lá você encontrará o que precisa revisar hoje. Basta clicar na matéria e seguir as instruções.",
  },
  {
    titulo: "Por que eu deveria utilizar o Athena?",
    resposta: "O Athena ajuda você a manter o foco nos estudos, organizando suas sessões de estudo e revisões de forma eficiente, para que você possa alcançar seus objetivos acadêmicos com mais facilidade. Nós utilizamos técnicas comprovadas de aprendizado para maximizar sua retenção de informações.",
  },
  {
    titulo: "Posso alterar minha rotina de estudos?",
    resposta: "Sim. Vá em 'Tela inicial', selecione 'editar' e personalize suas atividades.",
  },
];

const Ajuda = () => {
  const [aberta, setAberta] = useState(null);

  const toggle = (index) => {
    setAberta(aberta === index ? null : index);
  };

  return (
    <div className="main-content"> 
      <h1>Com o que podemos ajudar?</h1>

      <div className="faq-container">
        {perguntas.map((item, index) => (
          <div 
            className="faq-item" 
            key={index} 
            onClick={() => toggle(index)}
          >
            <div className="faq-question">
              <span>{item.titulo}</span>
              <span className={`arrow ${aberta === index ? "open" : ""}`}>&gt;</span>
            </div>

            {aberta === index && (
              <div className="faq-answer">
                {item.resposta}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ajuda;
