import axios from "axios";
const BASE_URL = "http://localhost:8080/usuario";

export const buscarUsuarios = () => axios.get(`${BASE_URL}/findAll`);
export const cadastrarUsuario = (usuario) => axios.post(`${BASE_URL}/save`, usuario);
export const loginUsuario = (credenciais) => axios.post(`${BASE_URL}/login`, credenciais);

// NOVOS MÉTODOS:
export const excluirUsuario = (id) => axios.delete(`${BASE_URL}/delete/${id}`);
export const ativarUsuario = (id) => axios.put(`${BASE_URL}/ativar/${id}`);
export const inativarUsuario = (id) => axios.put(`${BASE_URL}/inativar/${id}`);