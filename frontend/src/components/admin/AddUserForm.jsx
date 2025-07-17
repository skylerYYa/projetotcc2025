import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { cadastrarUsuario } from "../../services/usuarioService";
import { useUsers } from "../../context/UserContext"; 

const { refreshUsersFromBackend } = useUsers();
cadastrarUsuario(userData)
  .then(() => {
    alert("Usuário cadastrado com sucesso!");
    refreshUsersFromBackend(); 
    clearForm(false);
  })

const inputClass = "w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150 text-sm placeholder:text-slate-400";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

const AddUserForm = ({ onSubmit, onCancel, initialData, isSubmitting }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [role, setRole] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const populateForm = (data) => {
    if (data) {
      setIsEditing(true);
      setName(data.name || '');
      setEmail(data.email || '');
      setBirthdate(data.birthdate || '');
      setRole(data.role || '');
      setIsActive(data.active !== undefined ? data.active : true);
    }
  };
  
  useEffect(() => {
    if (initialData) {
      populateForm(initialData);
    } else {
      clearForm(false);
    }
  }, [initialData]);

  const clearForm = (notifyCancel = true) => {
    setName('');
    setEmail('');
    setBirthdate('');
    setRole('');
    setIsActive(true);
    setIsEditing(false);
    if (notifyCancel && onCancel) {
        onCancel();
    }
  };
  
  const handleSubmit = (e) => {
  e.preventDefault();
  if (!name || !email || !birthdate || !role) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const userData = {
  nome: name,
  email,
  dataNascimento: birthdate,
  cargo: role,
  ativo: isActive,
  senha: senha, 
};

  cadastrarUsuario(userData)
    .then(() => {
      alert("Usuário cadastrado com sucesso!");
      clearForm(false);
    })
    .catch((err) => {
      console.error("Erro ao cadastrar usuário:", err);
      alert("Erro ao salvar no banco. Verifique os dados ou a conexão.");
    });
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
        {isEditing ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label htmlFor="name" className={labelClass}>Nome*</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>E-mail*</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputClass} />
        </div>
      </div>

      <div>
  <label htmlFor="senha" className={labelClass}>Senha*</label>
  <input
    type="password"
    id="senha"
    value={senha}
    onChange={e => setSenha(e.target.value)}
    required
    className={inputClass}
  />
</div>

      <div>
        <label htmlFor="birthdate" className={labelClass}>Data de Nascimento*</label>
        <input type="date" id="birthdate" value={birthdate} onChange={e => setBirthdate(e.target.value)} required className={inputClass} />
      </div>

      <div>
        <label htmlFor="role" className={labelClass}>Cargo*</label>
        <select id="role" value={role} onChange={e => setRole(e.target.value)} required className={inputClass}>
          <option value="">Selecione...</option>
          <option value="Administrador">ADM</option>
          <option value="Developer">Developer</option>
          <option value="Estudante">Estudante</option>
          <option value="Diretor(a)">Diretor(a)</option>
          <option value="Coordenador(a)">Coordenador(a)</option>
        </select>
      </div>

      <div className="flex items-center mt-4">
        <input type="checkbox" id="isActive" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="h-5 w-5 text-upliving-primary rounded border-slate-300 focus:ring-upliving-primary shadow-sm cursor-pointer" />
        <label htmlFor="isActive" className="ml-2 text-sm text-slate-700 cursor-pointer">Usuário Ativo</label>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-200 mt-4">
        {onCancel && (
            <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                type="button" onClick={() => clearForm(true)}
                className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-sm flex items-center justify-center"
            >
                <XCircleIcon className="w-5 h-5 inline mr-2" />
                Cancelar
            </motion.button>
        )}
        <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 bg-upliving-primary hover:bg-upliving-primary-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {isSubmitting ? (
                <ArrowPathIcon className="w-5 h-5 inline mr-2 animate-spin" />
            ) : (
                 isEditing ? <PlusCircleIcon className="w-5 h-5 inline mr-2" /> : <PlusCircleIcon className="w-5 h-5 inline mr-2" />
            )}
            {isSubmitting ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Adicionar Usuário')}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default AddUserForm;