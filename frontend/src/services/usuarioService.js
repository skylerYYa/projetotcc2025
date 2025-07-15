import axios from "axios";

const BASE_URL = "http://localhost:8080/usuario";

// 🔹 Buscar todos os usuários
export const buscarUsuarios = () => axios.get(`${BASE_URL}/findAll`);

// 🔹 Cadastrar novo usuário
export const cadastrarUsuario = (dadosUsuario) => axios.post(`${BASE_URL}/save`, dadosUsuario);

// 🔹 Fazer login
export const loginUsuario = (credenciais) => axios.post(`${BASE_URL}/login`, credenciais);