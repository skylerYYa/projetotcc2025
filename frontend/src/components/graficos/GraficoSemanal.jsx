import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

function GraficoSemanal({ dados }) {
  
  const registros = Array.isArray(dados) ? dados : [];

 
  const PERIODOS = ["Manha", "Tarde", "Noite"];
  const dadosAgrupados = PERIODOS.map(periodo => {
    const registrosPeriodo = registros.filter(r => r.periodo === periodo);
    const totalPorcoes = registrosPeriodo.reduce(
      (acc, item) => acc + (Number(item.porcoesServidas) || 0), 0
    );
    return { periodo, porcoesServidas: totalPorcoes };
  });

 
  if (!registros.length) {
    return <div className="text-center text-gray-500">Sem dados para exibir o gráfico.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={dadosAgrupados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="periodo" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="porcoesServidas" fill="#732457" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default GraficoSemanal;