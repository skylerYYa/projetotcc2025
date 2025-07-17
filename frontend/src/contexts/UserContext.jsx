import React, { createContext, useState, useEffect, useContext } from "react";
import { buscarUsuarios } from "../services/usuarioService";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const refreshUsersFromBackend = () => {
  buscarUsuarios()
    .then((res) => {
      setUsers(res.data);
      localStorage.setItem("usuarios", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.error("Erro ao buscar usuários:", err);
    });
};

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("usuarios");
    return storedUsers ? JSON.parse(storedUsers) : []; 
  });

  useEffect(() => {
  fetch("http://localhost:8080/usuario/findAll")
    .then((res) => res.json())
    .then((data) => {
      setUsers(data);
      localStorage.setItem("usuarios", JSON.stringify(data));
    });
}, []);

  const addUser = (newUserData) => {
  const newUserWithId = {
    ...newUserData,
    id: newUserData.id || `usr${Date.now()}_${Math.random().toString(16).slice(2)}`,
    nome: newUserData.nome?.trim() || "Usuário sem nome",
    funcao: newUserData.funcao?.trim() || "Função não definida", 
    createdAt: new Date(),
    active: true,
  };
  const updatedUsers = [newUserWithId, ...users];
  setUsers(updatedUsers);
  localStorage.setItem("usuarios", JSON.stringify(updatedUsers)); 
};

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser, lastModified: new Date() } : user
      )
    );
    localStorage.setItem("usuarios", JSON.stringify(users)); 
  };

  const toggleUserStatus = (userId) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user
      );
      localStorage.setItem("usuarios", JSON.stringify(updatedUsers)); 
      return updatedUsers;
    });
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user.id !== userId);
      localStorage.setItem("usuarios", JSON.stringify(updatedUsers)); 
      return updatedUsers;
    });
  };

  return (
    <UserContext.Provider value={{
  users,
  addUser,
  updateUser,
  toggleUserStatus,
  deleteUser,
  refreshUsersFromBackend 
}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};