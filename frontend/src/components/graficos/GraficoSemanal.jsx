import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const GraficoSemanal = ({ dados }) => {
  if (!dados || dados.length === 0) {
    return <div className="w-full bg-white p-2 rounded-lg shadow text-center text-[#732457]">Nenhum dado para exibir.</div>;
  }

  const periodos = ["Manhã", "Tarde", "Noite"];
  const labels = periodos;

  const pratosPorPeriodo = periodos.map((periodo) => {
    const registrosPeriodo = dados.filter((d) => d.periodo === periodo);
    const total = registrosPeriodo.reduce(
      (acc, item) => acc + (parseInt(item.porcoesServidas ?? item.pratosServidos ?? 0, 10) || 0),
      0
    );
    return total;
  });

  const alunosPorPeriodo = periodos.map((periodo) => {
    const registrosPeriodo = dados.filter((d) => d.periodo === periodo);
    const total = registrosPeriodo.reduce(
      (acc, item) => acc + (parseInt(item.alunosPresentes ?? 0, 10) || 0),
      0
    );
    return total;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Pratos Servidos",
        data: pratosPorPeriodo,
        backgroundColor: "#a64182",
      },
      {
        label: "Alunos Presentes",
        data: alunosPorPeriodo,
        backgroundColor: "#732457",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#732457" },
      },
      title: {
        display: true,
        text: "Consumo por Período",
        color: "#732457",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#732457", font: { size: 14 } },
        grid: { color: "#eee" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#732457", font: { size: 14 } },
        grid: { color: "#eee" },
      },
    },
  };

  return (
    <div className="w-full bg-white p-2 rounded-lg shadow">
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoSemanal;