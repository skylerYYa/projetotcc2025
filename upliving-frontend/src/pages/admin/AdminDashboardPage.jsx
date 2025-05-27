import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApartments } from '../../contexts/ApartmentContext';
import AddApartmentForm from '../../components/admin/AddApartmentForm';
import Logo from '../../components/common/Logo';
import {
  ArrowLeftOnRectangleIcon, PlusIcon, PencilSquareIcon, TrashIcon, EyeIcon, EyeSlashIcon, ListBulletIcon, XMarkIcon, BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } },
};

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { apartments, addApartment, updateApartment, toggleApartmentStatus, deleteApartment } = useApartments();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingApartment, setEditingApartment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Para feedback no botão

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/admin/login');
  };

  const handleFormSubmit = async (apartmentData) => {
    setIsSubmitting(true);
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 700));

    if (editingApartment && apartmentData.id) {
      updateApartment(apartmentData);
      alert('Imóvel atualizado com sucesso!');
      setEditingApartment(null);
    } else {
      addApartment(apartmentData);
      alert('Imóvel adicionado com sucesso!');
    }
    setShowAddForm(false);
    setIsSubmitting(false);
  };
  
  const handleEditApartment = (apartment) => {
    setEditingApartment(apartment);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll para o topo para ver o form
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingApartment(null);
  };
  
  const handleDeleteApartment = (apartmentId, apartmentName) => {
    if (window.confirm(`Tem certeza que deseja excluir o imóvel "${apartmentName}"? Esta ação não pode ser desfeita.`)) {
      deleteApartment(apartmentId); // Chama a função do contexto
      alert(`Imóvel "${apartmentName}" excluído com sucesso.`);
    }
  };

  // Ordenar apartamentos, talvez por mais recente (se houver timestamp) ou por nome
  const sortedApartments = [...apartments].sort((a, b) => {
    const dateA = a.timestamp || a.lastModified || 0;
    const dateB = b.timestamp || b.lastModified || 0;
    return new Date(dateB) - new Date(dateA);
  });


  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen bg-slate-100"
    >
      <nav className="bg-slate-800 text-white p-4 shadow-xl sticky top-0 z-40 print:hidden">
        <div className="container mx-auto flex justify-between items-center h-16">
          <Logo iconSize="h-8 w-8" textSize="text-2xl" color="text-upliving-primary-light" />
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-300 hidden sm:block">Painel Administrativo</span>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors shadow-md hover:shadow-lg flex items-center"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-1.5" />
              Sair
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div 
          initial={{ opacity:0, y: -15 }} animate={{ opacity:1, y: 0 }} transition={{ delay: 0.1, duration: 0.4}}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-slate-300"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4 sm:mb-0">
            Gestão de Imóveis
          </h1>
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.98 }}
            onClick={() => { 
                setEditingApartment(null); // Limpa edição ao clicar em adicionar novo
                setShowAddForm(prev => !prev); 
                if (!showAddForm) window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-white shadow-lg hover:shadow-xl flex items-center
                        ${showAddForm && !editingApartment
                          ? 'bg-amber-500 hover:bg-amber-600'
                          : 'bg-upliving-primary hover:bg-upliving-primary-dark'}`}
          >
            {showAddForm && !editingApartment ? <XMarkIcon className="w-5 h-5 mr-2" /> : <PlusIcon className="w-5 h-5 mr-2" />}
            {showAddForm && !editingApartment ? 'Fechar Formulário' : 'Adicionar Novo Imóvel'}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showAddForm && (
            <motion.section
              key="add-edit-apartment-form"
              initial={{ opacity: 0, height: 0, y: -20, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', y: 0, marginBottom: '40px', transition: { duration: 0.4, ease: "easeInOut" } }}
              exit={{ opacity: 0, height: 0, y: -20, marginBottom: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
              className="overflow-hidden" // Importante para animação de altura
            >
              <AddApartmentForm 
                onSubmit={handleFormSubmit} 
                onCancel={handleCancelForm}
                initialData={editingApartment}
                isSubmitting={isSubmitting}
              />
            </motion.section>
          )}
        </AnimatePresence>

        <motion.section 
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: showAddForm ? 0.5 : 0.2, duration: 0.5}}
        >
          <h2 className="text-2xl font-semibold text-slate-700 mb-5 flex items-center">
            <ListBulletIcon className="w-7 h-7 mr-3 text-upliving-primary" />
            Imóveis Cadastrados ({sortedApartments.length})
          </h2>
          {sortedApartments.length === 0 && !showAddForm ? (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-slate-500 text-center py-12 bg-white rounded-xl shadow-md">
              <BuildingOfficeIcon className="w-16 h-16 mx-auto text-slate-300 mb-4"/>
              Nenhum imóvel cadastrado ainda. Clique em "Adicionar Novo Imóvel" para começar.
            </motion.div>
          ) : sortedApartments.length > 0 ? (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden"> {/* Removido overflow-x-auto se a tabela for responsiva */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">Endereço</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3.5 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    <AnimatePresence initial={false}>
                      {sortedApartments.map((apt) => (
                        <motion.tr 
                            key={apt.id} 
                            className="hover:bg-slate-50/70 transition-colors duration-150"
                            layout // Anima mudanças de posição/ordem
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{apt.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 max-w-xs truncate hidden md:table-cell" title={apt.address}>{apt.address}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{apt.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <motion.span 
                                whileHover={{ scale: 1.1 }}
                                onClick={() => toggleApartmentStatus(apt.id)}
                                className={`cursor-pointer px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm transition-all
                                            ${apt.active ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                            >
                              {apt.active ? 'ATIVO' : 'INATIVO'}
                            </motion.span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={() => handleEditApartment(apt)} className="text-upliving-accent hover:text-upliving-accent-dark transition-colors p-1.5 hover:bg-indigo-50 rounded-lg" title="Editar Imóvel">
                              <PencilSquareIcon className="w-5 h-5"/>
                            </motion.button>
                            <motion.button 
                                whileHover={{scale:1.1}} whileTap={{scale:0.9}}
                                onClick={() => toggleApartmentStatus(apt.id)} 
                                className={`p-1.5 rounded-lg transition-colors ${apt.active ? 'text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100' : 'text-green-500 hover:text-green-700 hover:bg-green-100'}`}
                                title={apt.active ? 'Desativar' : 'Ativar'}
                            >
                              {apt.active ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                            </motion.button>
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={() => handleDeleteApartment(apt.id, apt.name)} className="text-red-500 hover:text-red-700 transition-colors p-1.5 hover:bg-red-50 rounded-lg" title="Excluir Imóvel">
                              <TrashIcon className="w-5 h-5"/>
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </motion.section>
      </main>
      <footer className="bg-slate-900 text-slate-400 text-center p-8 mt-16 print:hidden">
        <p>&copy; {new Date().getFullYear()} UpLiving Imobiliária. Painel Administrativo.</p>
      </footer>
    </motion.div>
  );
};

export default AdminDashboardPage;