import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import GraficoSemanal from "../components/graficos/GraficoSemanal";

const RelatorioPage = () => {
  const navigate = useNavigate();
  const [mostrarGraficos, setMostrarGraficos] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("");

  //  Adicionando informações fictícias para visualização inicial
  const [dadosRefeicao, setDadosRefeicao] = useState([
    { diaSemana: "Segunda-feira", periodo: "Manhã", alunosPresentes: 500, alunosComeram: 450, repeticoes: 100, refeicao: "Farofa de Linguiça", pratosServidos: 600 },
    { diaSemana: "Segunda-feira", periodo: "Tarde", alunosPresentes: 480, alunosComeram: 430, repeticoes: 90, refeicao: "Arroz com Feijão", pratosServidos: 550 },
    { diaSemana: "Segunda-feira", periodo: "Noite", alunosPresentes: 450, alunosComeram: 400, repeticoes: 80, refeicao: "Peixe", pratosServidos: 500 },
  ]);

  //  Estado para armazenar os dados do formulário
  const [novoRegistro, setNovoRegistro] = useState({
  diaSemana: "Segunda-feira",
  periodo: "Manhã",
  alunosPresentes: "",
  alunosComeram: "",
  repeticoes: "",
  refeicao: "",
  pratosServidos: "",
});

  const handleChange = (e) => {
    setNovoRegistro({ ...novoRegistro, [e.target.name]: e.target.value });
  };

  const [atualizarGraficos, setAtualizarGraficos] = useState(false);

const handleAdicionarRegistro = () => {
  if (novoRegistro.alunosPresentes && novoRegistro.alunosComeram && novoRegistro.repeticoes && novoRegistro.refeicao && novoRegistro.pratosServidos) {
    const novoDados = [...dadosRefeicao, { ...novoRegistro, id: Date.now() }];
setDadosRefeicao(novoDados); // 🔥 Atualizando corretamente!
    // 🔥 Garantir atualização dos gráficos
    setAtualizarGraficos(!atualizarGraficos);

    setMensagemModal(`Registro de ${novoRegistro.diaSemana} (${novoRegistro.periodo}) adicionado com sucesso!`);
    setMostrarModal(true);

    setNovoRegistro({ diaSemana: "", periodo: "", alunosPresentes: "", alunosComeram: "", repeticoes: "", refeicao: "", pratosServidos: "" });
  } else {
    alert("Preencha todos os campos antes de adicionar!");
  }
};

  const calcularMediaPratosPorPeriodo = (dia, periodo) => {
  const registrosPeriodo = dadosRefeicao.filter(d => d.diaSemana === dia && d.periodo === periodo);
  if (registrosPeriodo.length === 0) return 0;

  const totalPratosServidos = registrosPeriodo.reduce((acc, item) => acc + parseInt(item.pratosServidos), 0);

  return totalPratosServidos;
};

const calcularMediaPratosDia = (dia) => {
  const registrosDoDia = dadosRefeicao.filter(d => d.diaSemana === dia);
  if (registrosDoDia.length === 0) return 0;

  const totalPratosServidos = registrosDoDia.reduce((acc, item) => acc + parseInt(item.pratosServidos), 0);

  return totalPratosServidos;
};

  return (
    <motion.div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-start">
      
      {/* Header atualizado */}
      <div className="w-full bg-[#732457] text-white px-8 py-4 flex items-center justify-between shadow-lg">
        <h1 className="text-2xl font-bold">Relatórios de Consumo & Estatísticas</h1>
        <button 
          onClick={() => navigate("/dashboard")} 
          className="flex items-center bg-[#a64182] hover:bg-[#732457] text-white font-semibold px-4 py-2 rounded-lg shadow-md"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Voltar ao Painel
        </button>
      </div>

      {/* Modal de confirmação */}
      {mostrarModal && (
        <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold text-[#732457] mb-4">Registro Adicionado</h2>
            <p>{mensagemModal}</p>
            <button onClick={() => setMostrarModal(false)} className="mt-4 bg-[#4CAF50] hover:bg-[#388E3C] text-white py-2 px-4 rounded-lg">
              OK
            </button>
          </div>
        </motion.div>
      )}

     {/* Formulário para adicionar registros reais */}
<motion.div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-lg w-3/5">
  <h2 className="text-lg font-bold text-[#732457]">Adicionar Registro Diário</h2>

  <label className="block font-semibold mt-3">Dia da Semana:</label>
  <select name="diaSemana" value={novoRegistro.diaSemana} onChange={handleChange} className="w-full p-2 border rounded-md">
  {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"].map((dia) => (
    <option key={dia} value={dia}>{dia}</option>
  ))}
</select>

  <label className="block font-semibold mt-3">Refeição:</label>
  <input type="text" name="refeicao" value={novoRegistro.refeicao} onChange={handleChange} className="w-full p-2 border rounded-md"/>

  <label className="block font-semibold mt-3">Período:</label>
  <select name="periodo" value={novoRegistro.periodo} onChange={handleChange} className="w-full p-2 border rounded-md">
    {["Manhã", "Tarde", "Noite"].map((p) => (
      <option key={p} value={p}>{p}</option>
    ))}
  </select>

  <label className="block font-semibold mt-3">Alunos Presentes:</label>
  <input type="number" name="alunosPresentes" value={novoRegistro.alunosPresentes} onChange={handleChange} className="w-full p-2 border rounded-md"/>

  <label className="block font-semibold mt-3">Alunos que Comeram:</label>
  <input type="number" name="alunosComeram" value={novoRegistro.alunosComeram} onChange={handleChange} className="w-full p-2 border rounded-md"/>

  <label className="block font-semibold mt-3">Repetições de Prato:</label>
  <input type="number" name="repeticoes" value={novoRegistro.repeticoes} onChange={handleChange} className="w-full p-2 border rounded-md"/>

  <label className="block font-semibold mt-3">Pratos Servidos:</label>
  <input type="number" name="pratosServidos" value={novoRegistro.pratosServidos} onChange={handleChange} className="w-full p-2 border rounded-md"/>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={handleAdicionarRegistro}
    className="w-full mt-4 bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-lg shadow-md"
  >
    Adicionar Registro
  </motion.button>
</motion.div>

      {/* Gráficos por dia da semana */}
{mostrarGraficos && (
  <>
    {[...new Set(dadosRefeicao.map(d => d.diaSemana))].map((dia) => (
      <motion.div key={dia} className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg w-3/5">
        <h2 className="text-lg font-bold text-[#732457] mb-4">
          {dia} - {dadosRefeicao.find(d => d.diaSemana === dia)?.refeicao || "Refeição Não Definida"}
        </h2>
        
        {/* Exibir gráfico com dados atualizados */}
        <GraficoSemanal dados={dadosRefeicao.filter(d => d.diaSemana === dia)} />

        {/* Exibir média por período */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-md font-bold text-[#732457]">Média de Pratos Servidos por Período</h3>
          <p className="text-lg font-semibold text-[#a64182]">
              Manhã: {calcularMediaPratosPorPeriodo(dia, "Manhã")} pratos
          </p>
          <p className="text-lg font-semibold text-[#a64182]">
              Tarde: {calcularMediaPratosPorPeriodo(dia, "Tarde")} pratos
          </p>
          <p className="text-lg font-semibold text-[#a64182]">
              Noite: {calcularMediaPratosPorPeriodo(dia, "Noite")} pratos
          </p>
        </div>

        {/* Exibir média total do dia */}
        <div className="mt-2 bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-md font-bold text-[#732457]">Média Total de Pratos Servidos no Dia</h3>
          <p className="text-lg font-semibold text-[#a64182]">
              {calcularMediaPratosDia(dia)} pratos no total
          </p>
        </div>
      </motion.div>
    ))}
  </>
)}
    </motion.div>
  );
};

export default RelatorioPage;