import axios from "axios";
const BASE_URL = "http://localhost:8080/refeicao";

export const cadastrarRefeicao = (dadosRefeicao) => 
  axios.post(BASE_URL, dadosRefeicao);

export const buscarRefeicoes = () => 
  axios.get(BASE_URL);