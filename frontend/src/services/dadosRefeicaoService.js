import axios from "axios";
const BASE_URL = "http://localhost:8080/api/dados-refeicao";

export const cadastrarDadosRefeicao = (dados) => 
  axios.post(BASE_URL, dados);

export const buscarDadosRefeicao = () => 
  axios.get(BASE_URL);