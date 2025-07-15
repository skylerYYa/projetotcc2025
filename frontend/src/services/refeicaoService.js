import axios from "axios";

const BASE_URL = "http://localhost:8080/api/refeicoes";

// 🔍 Buscar todas as refeições
export const buscarRefeicoes = () => axios.get(BASE_URL);

// 📅 Buscar por período (opcional, se o backend permitir filtros)
export const buscarPorPeriodo = (periodo) =>
  axios.get(`${BASE_URL}?periodo=${periodo}`);

// 🧭 Buscar por dia da semana (opcional)
export const buscarPorDiaSemana = (dia) =>
  axios.get(`${BASE_URL}?diaSemana=${dia}`);

// ➕ Cadastrar nova refeição (se houver no frontend)
export const cadastrarRefeicao = (dadosRefeicao) =>
  axios.post(BASE_URL, dadosRefeicao);