import axios from "axios";

const BASE_URL = "http://localhost:8080/usuario";

export const buscarUsuarios = () => axios.get(`${BASE_URL}/findAll`);

export const cadastrarUsuario = (usuario) =>
  axios.post("http://localhost:8080/usuario/save", usuario);

export const loginUsuario = (credenciais) => axios.post(`${BASE_URL}/login`, credenciais);