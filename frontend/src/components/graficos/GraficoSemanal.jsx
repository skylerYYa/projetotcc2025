import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoSemanal = ({ dados }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
  setChartData({
    labels: dados.map((d) => d.diaSemana),
    datasets: [
      { label: "Alunos Presentes", data: dados.map((d) => d.alunosPresentes || 0), backgroundColor: "#4CAF50" },
      { label: "Alunos que Comeram", data: dados.map((d) => d.alunosComeram || 0), backgroundColor: "#F44336" },
      { label: "Repetições", data: dados.map((d) => d.repeticoes || 0), backgroundColor: "#FFC107" },
      { label: "Pratos Servidos", data: dados.map((d) => d.pratosServidos || 0), backgroundColor: "#a64182" },
    ],
  });
}, [dados]); //  Atualiza sempre que "dados" mudar!

  return <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />;
};

export default GraficoSemanal;