import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUsers } from "../../contexts/UserContext";
import AddUserForm from "../../components/admin/AddUserForm";
import Logo from "../../components/common/Logo";
import { ArrowLeftOnRectangleIcon, PlusIcon, PencilSquareIcon, TrashIcon, XMarkIcon, UsersIcon } from "@heroicons/react/24/outline";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } },
};

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { users, addUser, updateUser, toggleUserStatus, deleteUser } = useUsers();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthToken");
    navigate("/admin/login");
  };

  const handleFormSubmit = async (userData) => {
    if (editingUser) {
      updateUser(userData);
      alert("Usuário atualizado com sucesso!");
      setEditingUser(null);
    } else {
      addUser(userData);
      alert("Usuário adicionado com sucesso!");
    }
    setShowAddForm(false);
  };

  const handleToggleStatus = (userId) => {
    toggleUserStatus(userId);
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Tem certeza que deseja excluir "${userName}"? Esta ação não pode ser desfeita.`)) {
      deleteUser(userId);
      alert(`Usuário "${userName}" excluído com sucesso.`);
    }
  };

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="min-h-screen bg-slate-100">
      
      {/* Header ajustado */}
     <nav className="bg-[#732457] text-white px-4 py-1 shadow-md sticky top-0 z-40 flex justify-between items-center h-14">
        <Logo iconSize="h-8 w-8" textSize="text-2xl" />
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/qr-code")}
            className="bg-[#a64182] hover:bg-[#732457] text-white font-semibold px-4 py-2 rounded-lg shadow-md flex items-center"
          >
            <UsersIcon className="w-5 h-5 mr-2" /> QR Code
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md flex items-center"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" /> Sair
          </motion.button>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <motion.div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-slate-300">
          <h1 className="text-3xl font-extrabold text-[#732457]">Gestão de Usuários</h1>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(prev => !prev)}
            className="font-semibold py-3 px-6 rounded-xl bg-[#a64182] hover:bg-[#732457] text-white shadow-lg flex items-center"
          >
            {showAddForm ? <XMarkIcon className="w-5 h-5 mr-2" /> : <PlusIcon className="w-5 h-5 mr-2" />}
            {showAddForm ? "Fechar Formulário" : "Adicionar Novo Usuário"}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showAddForm && (
            <motion.section key="add-edit-user-form" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="overflow-hidden">
              <AddUserForm onSubmit={handleFormSubmit} initialData={editingUser} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Exibição da lista de usuários ajustada */}
        <div className="mt-8">
          {users.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#732457] text-white">
                    <th className="py-3 px-6 text-left">Nome</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Função</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
  {users.map((user) => (
    <tr key={user.id} className="border-b border-slate-300 hover:bg-slate-100">
      <td className="py-3 px-6">{user.name || "Sem nome"}</td> 
      <td className="py-3 px-6">{user.email}</td>
      <td className="py-3 px-6">{user.role || "Sem função definida"}</td>
      <td className="py-3 px-6 text-center">
        <button 
          onClick={() => handleToggleStatus(user.id)}
          className={`px-3 py-1 rounded-full text-white transition ${
            user.active ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {user.active ? "Ativo" : "Inativo"}
        </button>
      </td>
      <td className="py-3 px-6 text-center flex justify-center space-x-3">
        <button 
  onClick={() => {
    setEditingUser(user);
    setShowAddForm(true); 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }}
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow-sm flex items-center"
>
  <PencilSquareIcon className="w-5 h-5 mr-2" /> Editar
</button>
        <button 
          onClick={() => handleDeleteUser(user.id, user.nome)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm flex items-center"
        >
          <TrashIcon className="w-5 h-5 mr-2" /> Excluir
        </button>
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-lg text-center mt-6">Nenhum usuário cadastrado ainda!</p>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default AdminDashboardPage;