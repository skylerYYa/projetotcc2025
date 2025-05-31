import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const QrCodePage = () => {
  const navigate = useNavigate();
  const [rm, setRM] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);

  // 🔥 Gere valores aleatórios para simular os registros diários dos QR Codes!
  const [dadosRefeicao, setDadosRefeicao] = useState({
    pratosConsumidos: Math.floor(Math.random() * (140 - 100) + 100), 
    pratosNaoConsumidos: Math.floor(Math.random() * (50 - 20) + 20), 
    repeticoes: Math.floor(Math.random() * (60 - 30) + 30), 
    mediaPratosRecomendada: 0
  });

  const handleGenerateQrCode = () => {
    if (rm.trim() !== "") {
      setQrCodeData(`Aluno: ${rm}`);
      
      // 🔥 Calcular nova média baseada no consumo acumulado da semana
      const novaMedia = Math.ceil((dadosRefeicao.pratosConsumidos + dadosRefeicao.repeticoes) / 2);
      setDadosRefeicao((prev) => ({ ...prev, mediaPratosRecomendada: novaMedia }));
    }
  };

  // 🔥 Dados do gráfico da semana (acumulativo)
  const dadosGraficoSemana = [
    { dia: "Seg", consumidos: dadosRefeicao.pratosConsumidos, naoConsumidos: dadosRefeicao.pratosNaoConsumidos, repeticoes: dadosRefeicao.repeticoes },
    { dia: "Ter", consumidos: dadosRefeicao.pratosConsumidos + 5, naoConsumidos: dadosRefeicao.pratosNaoConsumidos - 3, repeticoes: dadosRefeicao.repeticoes + 2 },
    { dia: "Qua", consumidos: dadosRefeicao.pratosConsumidos + 8, naoConsumidos: dadosRefeicao.pratosNaoConsumidos - 2, repeticoes: dadosRefeicao.repeticoes + 4 },
    { dia: "Qui", consumidos: dadosRefeicao.pratosConsumidos + 4, naoConsumidos: dadosRefeicao.pratosNaoConsumidos + 1, repeticoes: dadosRefeicao.repeticoes - 3 },
    { dia: "Sex", consumidos: dadosRefeicao.pratosConsumidos + 6, naoConsumidos: dadosRefeicao.pratosNaoConsumidos - 1, repeticoes: dadosRefeicao.repeticoes + 1 },
  ];

  return (
    <motion.div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-start">
      
      {/* Header atualizado */}
      <div className="w-full bg-[#732457] text-white px-8 py-4 flex items-center justify-between shadow-lg">
        <h1 className="text-2xl font-bold">Gerador de QR Code & Estatísticas Semanais</h1>
        <button 
          onClick={() => navigate("/dashboard")} 
          className="flex items-center bg-[#a64182] hover:bg-[#732457] text-white font-semibold px-4 py-2 rounded-lg shadow-md"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Voltar ao Painel
        </button>
      </div>

      {/* Container principal agora organiza os elementos lado a lado */}
      <div className="w-full max-w-6xl flex flex-row gap-8 mt-8 px-8">
        
        {/* Criador de QR Code */}
        <motion.div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-lg font-bold text-[#732457]">Criar QR Code do Aluno</h2>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mt-3 focus:ring-[#a64182]"
            placeholder="Digite o RM do aluno"
            value={rm}
            onChange={(e) => setRM(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerateQrCode}
            className="w-full mt-4 bg-[#a64182] hover:bg-[#732457] text-white py-3 rounded-lg shadow-md"
          >
            Gerar QR Code
          </motion.button>
          
          {/* Exibição do QR Code */}
          {qrCodeData && (
            <motion.div className="mt-6 flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <p className="text-[#732457] font-semibold">QR Code do aluno:</p>
              <QRCodeCanvas value={qrCodeData} size={150} className="mt-4" />
            </motion.div>
          )}
        </motion.div>

        {/* Gráfico único com colunas para cada categoria */}
        <motion.div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-lg font-bold text-[#732457] mb-4">Estatísticas da Semana</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosGraficoSemana}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="consumidos" fill="#4CAF50" name="Consumidos" />
              <Bar dataKey="naoConsumidos" fill="#F44336" name="Não Consumidos" />
              <Bar dataKey="repeticoes" fill="#FFC107" name="Repetições" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>

      {/* Exibição automática da média calculada */}
      <motion.div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-[#732457]">Média recomendada por dia:</h2>
        <p className="text-xl font-semibold text-[#a64182] mt-2">
          {dadosRefeicao.mediaPratosRecomendada} pratos por dia
        </p>
      </motion.div>

    </motion.div>
  );
};

export default QrCodePage;