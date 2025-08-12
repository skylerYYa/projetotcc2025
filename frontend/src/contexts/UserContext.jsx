import React, { createContext, useState, useEffect, useContext } from "react";
import {
  buscarUsuarios,
  cadastrarUsuario,
  excluirUsuario,
  ativarUsuario,
  inativarUsuario,
  atualizarUsuario,
} from "../services/usuarioService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshUsersFromBackend = () => {
    buscarUsuarios()
      .then((res) => {
        setUsers(res.data);
        localStorage.setItem("usuarios", JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuários:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshUsersFromBackend();
  }, []);

  const addUser = (newUserData) => {
    cadastrarUsuario(newUserData)
      .then((res) => {
        setUsers((prev) => [res.data, ...prev]);
        refreshUsersFromBackend();
      })
      .catch((err) => {
        console.error("Erro ao cadastrar usuário:", err);
      });
  };

  const updateUser = (id, updatedUser) => {
    return atualizarUsuario(id, updatedUser)
      .then((res) => {
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? res.data : user))
        );
        refreshUsersFromBackend();
        return res;
      })
      .catch((err) => {
        console.error("Erro ao atualizar usuário:", err);
        throw err;
      });
  };

  const toggleUserStatus = (userId, active) => {
    const fn = active ? inativarUsuario : ativarUsuario;
    fn(userId)
      .then((res) => {
        setUsers((prev) =>
          prev.map((user) => (user.id === userId ? res.data : user))
        );
        refreshUsersFromBackend();
      })
      .catch((err) => {
        console.error("Erro ao alterar status do usuário:", err);
      });
  };

  const deleteUser = (userId) => {
    excluirUsuario(userId)
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
        refreshUsersFromBackend();
      })
      .catch((err) => {
        console.error("Erro ao excluir usuário:", err);
      });
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        addUser,
        updateUser,
        toggleUserStatus,
        deleteUser,
        refreshUsersFromBackend,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};
