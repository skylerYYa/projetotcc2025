// src/services/dadosRefeicaoService.js

import axios from "axios";

const BASE_URL = "http://localhost:8080/api/dados-refeicao";

// Buscar todos os dados reais das refeições
export const buscarDadosRefeicao = () => axios.get(BASE_URL);