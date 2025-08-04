import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import GraficoSemanal from "../components/graficos/GraficoSemanal";
import { useState, useEffect } from "react";
import { cadastrarDadosRefeicao, buscarDadosRefeicao } from "../services/dadosRefeicaoService";
import { cadastrarRefeicao } from "../services/refeicaoService";

const DIAS_SEMANA = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira"
];

const PERIODOS = [
  "Manha",
  "Tarde",
  "Noite"
];

const RelatorioPage = () => {
  const navigate = useNavigate();

  const [dadosRefeicao, setDadosRefeicao] = useState([]);

  useEffect(() => {
    buscarDadosRefeicao()
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setDadosRefeicao(res.data);
        }
      })
      .catch((err) => {
        console.warn("Erro ao conectar com o backend.", err);
        // Se quiser, aqui pode adicionar dados mock para testes offline
      });
  }, []);

  const [mostrarGraficos, setMostrarGraficos] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("");

  const [novoRegistro, setNovoRegistro] = useState({
    diaSemana: DIAS_SEMANA[0],
    periodo: PERIODOS[0],
    alunosPresentes: "",
    alunosComeram: "",
    repeticoes: "",
    refeicao: "",
    pratosServidos: "",
  });

  const handleChange = (e) => {
    setNovoRegistro({ ...novoRegistro, [e.target.name]: e.target.value });
  };

  // CADASTRO DE NOVA REFEIÇÃO + REGISTRO
  const handleAdicionarRegistro = () => {
    if (
      novoRegistro.alunosPresentes &&
      novoRegistro.alunosComeram &&
      novoRegistro.repeticoes &&
      novoRegistro.refeicao &&
      novoRegistro.pratosServidos
    ) {
      const idDoUsuario = 1; // Ajuste para o usuário logado!

      // 1. Cadastrar a refeição
      const novaRefeicao = {
        diaSemana: novoRegistro.diaSemana,
        periodo: novoRegistro.periodo,
        nomeRefeicao: novoRegistro.refeicao,
        composicao: "Descrição da composição", // ajuste se quiser no form
        usuario: { id: idDoUsuario },
        dataCadastro: new Date().toISOString(),
        statusRefeicao: "ATIVO"
      };

      cadastrarRefeicao(novaRefeicao)
        .then(res => {
          const idDaRefeicaoCriada = res.data.id;

          // 2. Cadastrar o registro de dados da refeição
          const registroCorrigido = {
            alunosPresentes: parseInt(novoRegistro.alunosPresentes, 10),
            alunosComeram: parseInt(novoRegistro.alunosComeram, 10),
            porcoesServidas: parseInt(novoRegistro.pratosServidos, 10),
            usuario: { id: idDoUsuario },
            refeicao: { id: idDaRefeicaoCriada },
            dataCadastro: new Date().toISOString(),
            statusRefeicao: "ATIVO"
          };

          cadastrarDadosRefeicao(registroCorrigido)
            .then(() => {
              setMensagemModal(
                `Registro de ${novoRegistro.diaSemana} (${novoRegistro.periodo}) salvo com sucesso no banco!`
              );
              setMostrarModal(true);

              buscarDadosRefeicao().then((res) => setDadosRefeicao(res.data));
              setNovoRegistro({
                diaSemana: DIAS_SEMANA[0],
                periodo: PERIODOS[0],
                alunosPresentes: "",
                alunosComeram: "",
                repeticoes: "",
                refeicao: "",
                pratosServidos: "",
              });
            })
            .catch((err) => {
              console.error("Erro ao salvar os dados da refeição:", err);
              alert("Erro ao salvar os dados da refeição.");
            });
        })
        .catch((err) => {
          console.error("Erro ao cadastrar refeição:", err);
          alert("Erro ao cadastrar a refeição.");
        });
    } else {
      alert("Preencha todos os campos antes de adicionar!");
    }
  };

  // Cálculo de médias por período/dia
  const calcularMediaPratosPorPeriodo = (dia, periodo) => {
    const registrosPeriodo = dadosRefeicao.filter(
      d => d.diaSemana === dia && d.periodo === periodo
    );
    if (registrosPeriodo.length === 0) return 0;
    const totalPratosServidos = registrosPeriodo.reduce(
      (acc, item) => acc + parseInt(item.porcoesServidas || item.pratosServidos, 10),
      0
    );
    return Math.round(totalPratosServidos / registrosPeriodo.length);
  };

  const calcularMediaPratosDia = (dia) => {
    const registrosDoDia = dadosRefeicao.filter(d => d.diaSemana === dia);
    if (registrosDoDia.length === 0) return 0;
    const totalPratosServidos = registrosDoDia.reduce(
      (acc, item) => acc + parseInt(item.porcoesServidas || item.pratosServidos, 10),
      0
    );
    return Math.round(totalPratosServidos / registrosDoDia.length);
  };

  return (
    <motion.div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-start">
      {/* Header */}
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
            <button
              onClick={() => setMostrarModal(false)}
              className="mt-4 bg-[#4CAF50] hover:bg-[#388E3C] text-white py-2 px-4 rounded-lg"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}

      {/* Formulário para adicionar registros */}
      <motion.div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-lg w-3/5">
        <h2 className="text-lg font-bold text-[#732457]">Adicionar Registro Diário</h2>

        <label className="block font-semibold mt-3">Dia da Semana:</label>
        <select name="diaSemana" value={novoRegistro.diaSemana} onChange={handleChange} className="w-full p-2 border rounded-md">
          {DIAS_SEMANA.map((dia) => (
            <option key={dia} value={dia}>{dia}</option>
          ))}
        </select>

        <label className="block font-semibold mt-3">Refeição:</label>
        <input type="text" name="refeicao" value={novoRegistro.refeicao} onChange={handleChange} className="w-full p-2 border rounded-md" />

        <label className="block font-semibold mt-3">Período:</label>
        <select name="periodo" value={novoRegistro.periodo} onChange={handleChange} className="w-full p-2 border rounded-md">
          {PERIODOS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <label className="block font-semibold mt-3">Alunos Presentes:</label>
        <input type="number" name="alunosPresentes" value={novoRegistro.alunosPresentes} onChange={handleChange} className="w-full p-2 border rounded-md" />

        <label className="block font-semibold mt-3">Alunos que Comeram:</label>
        <input type="number" name="alunosComeram" value={novoRegistro.alunosComeram} onChange={handleChange} className="w-full p-2 border rounded-md" />

        <label className="block font-semibold mt-3">Repetições de Prato:</label>
        <input type="number" name="repeticoes" value={novoRegistro.repeticoes} onChange={handleChange} className="w-full p-2 border rounded-md" />

        <label className="block font-semibold mt-3">Pratos Servidos:</label>
        <input type="number" name="pratosServidos" value={novoRegistro.pratosServidos} onChange={handleChange} className="w-full p-2 border rounded-md" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAdicionarRegistro}
          className="w-full mt-4 bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-lg shadow-md"
        >
          Adicionar Registro
        </motion.button>
      </motion.div>

      {/* Renderização dos registros agrupados por dia */}
      {mostrarGraficos && (
        <>
          {DIAS_SEMANA.map((dia) => {
            const registrosDia = dadosRefeicao.filter(r => r.diaSemana === dia);
            if (registrosDia.length === 0) return null;
            return (
              <motion.div key={dia} className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg w-3/5">
                <h2 className="text-lg font-bold text-[#732457] mb-4">{dia}</h2>
                {/* Listar todos os registros daquele dia */}
                {registrosDia.map((registro, idx) => (
                  <div key={registro.id || `${dia}-${registro.periodo}-${idx}`} className="mb-4 p-4 bg-white rounded shadow">
                    <div className="font-semibold">
                      Período: {registro.periodo} | Refeição: {registro.refeicao?.nomeRefeicao || registro.refeicao || "?"}
                    </div>
                    <div>Alunos Presentes: {registro.alunosPresentes}</div>
                    <div>Alunos Comeram: {registro.alunosComeram}</div>
                    <div>Pratos Servidos: {registro.porcoesServidas}</div>
                  </div>
                ))}

                {/* Gráfico por dia */}
                <GraficoSemanal dados={registrosDia} />

                {/* Médias */}
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

                <div className="mt-2 bg-white p-4 rounded-lg shadow-lg text-center">
                  <h3 className="text-md font-bold text-[#732457]">Média Total de Pratos Servidos no Dia</h3>
                  <p className="text-lg font-semibold text-[#a64182]">
                    {calcularMediaPratosDia(dia)} pratos no total
                  </p>
                </div>
              </motion.div>
            );
          })}
        </>
      )}
    </motion.div>
  );
};

export default RelatorioPage;