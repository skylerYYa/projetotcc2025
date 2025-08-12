import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlusCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { cadastrarUsuario } from "../../services/usuarioService";
import { useUsers } from "../../contexts/UserContext";

const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150 text-sm placeholder:text-slate-400";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

const AddUserForm = ({ onCancel, initialData, isSubmitting }) => {
  const { refreshUsersFromBackend, updateUser } = useUsers();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [role, setRole] = useState("");
  const [rm, setRm] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const populateForm = (data) => {
    if (data) {
      setIsEditing(true);
      setName(data.nome || "");
      setEmail(data.email || "");
      setBirthdate(data.dataNascimento || "");
      setRole(data.nivelAcesso || "");
      setRm(data.rm || "");
      setIsActive(data.ativo !== undefined ? data.ativo : true);
    }
  };

  useEffect(() => {
    if (initialData) {
      populateForm(initialData);
    } else {
      clearForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const clearForm = (notifyCancel = true) => {
    setName("");
    setEmail("");
    setSenha("");
    setBirthdate("");
    setRole("");
    setRm("");
    setIsActive(true);
    setIsEditing(false);
    if (notifyCancel && onCancel) {
      onCancel();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !birthdate || !role) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const statusUsuario = isActive ? "ATIVO" : "INATIVO";
    const userData = {
      nome: name,
      email: email,
      dataNascimento: birthdate,
      nivelAcesso: role,
      rm: rm,
      senha: senha,
      statusUsuario,
    };

    if (isEditing) {
      updateUser(initialData.id, userData)
        .then(() => {
          alert("Usuário atualizado com sucesso!");
          refreshUsersFromBackend();
          clearForm(false);
        })
        .catch((err) => {
          console.error("Erro ao atualizar usuário:", err);
          alert("Erro ao atualizar no banco.");
        });
    } else {
      cadastrarUsuario(userData)
        .then(() => {
          alert("Usuário cadastrado com sucesso!");
          refreshUsersFromBackend();
          clearForm(false);
        })
        .catch((err) => {
          console.error("Erro ao cadastrar usuário:", err);
          alert("Erro ao salvar no banco. Verifique os dados ou a conexão.");
        });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-200"
    >
      <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6 border-b border-slate-200 pb-4">
        {isEditing ? "Editar Usuário" : "Cadastrar Novo Usuário"}
      </h3>

      {/* Nome */}
      <div>
        <label className={labelClass}>Nome</label>
        <input
          className={inputClass}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome completo"
        />
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email</label>
        <input
          className={inputClass}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@exemplo.com"
        />
      </div>

      {/* Senha */}
      <div>
        <label className={labelClass}>Senha</label>
        <input
          className={inputClass}
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
        />
      </div>

      {/* Data de nascimento */}
      <div>
        <label className={labelClass}>Data de Nascimento</label>
        <input
          className={inputClass}
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </div>

      {/* Função/Cargo */}
      <div>
        <label className={labelClass}>Função/Cargo</label>
        <select
          className={inputClass}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Selecione uma função</option>
          <option value="ADMIN">ADMIN</option>
          <option value="FUNCIONARIO">FUNCIONÁRIO</option>
          <option value="ALUNO">ALUNO</option>
        </select>
      </div>

      {role === "ALUNO" && (
        <div>
          <label className={labelClass}>RM do Aluno</label>
          <input
            className={inputClass}
            type="text"
            value={rm}
            onChange={(e) => setRm(e.target.value)}
            placeholder="Digite o RM do aluno"
          />
        </div>
      )}

      {/* Ativo/Inativo */}
      <div className="flex items-center">
        <input
          id="isActive"
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="isActive" className="text-sm">
          Usuário ativo
        </label>
      </div>

      {/* Botões */}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-1 bg-[#732457] text-white rounded-lg px-4 py-2 font-semibold shadow-md hover:bg-[#a64182] transition"
        >
          <PlusCircleIcon className="w-5 h-5" />
          {isEditing ? "Salvar Alterações" : "Cadastrar Usuário"}
        </button>
        <button
          type="button"
          onClick={() => clearForm()}
          className="flex-1 flex items-center justify-center gap-1 bg-gray-200 text-gray-800 rounded-lg px-4 py-2 font-semibold shadow hover:bg-gray-300 transition"
        >
          <XCircleIcon className="w-5 h-5" />
          Cancelar
        </button>
        <button
          type="button"
          onClick={refreshUsersFromBackend}
          className="flex items-center justify-center gap-1 bg-blue-100 text-blue-800 rounded-lg px-3 py-2 font-semibold shadow hover:bg-blue-200 transition"
        >
          <ArrowPathIcon className="w-5 h-5" />
        </button>
      </div>
    </motion.form>
  );
};

export default AddUserForm;
