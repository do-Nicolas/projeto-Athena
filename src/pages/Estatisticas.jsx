import React, { useEffect, useState } from "react";
import "./Estatisticas.css";
import { useUser } from "@clerk/clerk-react";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Estatisticas = () => {
  const { user } = useUser();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:3001/statistics", {
      headers: { "x-user-id": user.id }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ESTATÍSTICAS RECEBIDAS:", data);
        setStats(data);
      })
      .catch((err) => console.error("Erro ao carregar estatísticas:", err));
  }, [user]);

  if (!stats) return <p>Carregando...</p>;

  // Dados para o gráfico
  const acertos = 100 - stats.mediaErros;
  const erros = stats.mediaErros;

  const pieData = [
    { name: "Acertos", value: acertos },
    { name: "Erros", value: erros }
  ];

  const COLORS = ["#89e2f5", "#f7cdb1"];

  return (
    <div className="main-content estat-page">

      <div className="estat-title-container">
        <h1>Estatísticas</h1>
      </div>

      <div className="estat-card">

        <div className="estat-metrics">
          <div className="estat-box">
            <p className="estat-value">{stats.flashcardsResolvidos}</p>
            <span>flashcards resolvidos</span>
          </div>

          <div className="estat-box">
            <p className="estat-value">{stats.streak}</p>
            <span>sequência de revisão</span>
          </div>

          <div className="estat-box">
            <p className="estat-value">{stats.mediaErros}%</p>
            <span>média de erros</span>
          </div>
        </div>

        {/* ============================
            GRÁFICO DE PIZZA
        ============================ */}
        <div className="estat-chart-container">
          <h2>Taxa de acertos x erros</h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
         <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
                isAnimationActive={true}     
                animationDuration={1500}     
                animationEasing="ease-out"   
>

                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Estatisticas;
