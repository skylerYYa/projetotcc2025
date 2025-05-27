import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../contexts/ChatContext';
import LeadCard from '../../components/realtor/LeadCard';
import Logo from '../../components/common/Logo';
import { ArrowLeftOnRectangleIcon, InboxArrowDownIcon, FunnelIcon, EnvelopeIcon, EnvelopeOpenIcon, Bars3BottomLeftIcon, AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } },
};

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const RealtorDashboardPage = () => {
  const navigate = useNavigate();
  const { chatLeads, openChatForRealtor } = useChat();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('realtorAuthToken');
    navigate('/corretor/login');
  };

  const totalLeads = Array.isArray(chatLeads) ? chatLeads.length : 0;
  const unreadLeadsCount = Array.isArray(chatLeads) 
    ? chatLeads.filter(lead => lead.unreadByRealtor).length 
    : 0;

  const filteredAndSortedLeads = useMemo(() => {
    let leadsToDisplay = Array.isArray(chatLeads) ? [...chatLeads] : [];
    const lowerSearchTerm = searchTerm.toLowerCase();

    if (lowerSearchTerm) {
      leadsToDisplay = leadsToDisplay.filter(lead => 
        lead.clientId.toLowerCase().includes(lowerSearchTerm) ||
        lead.apartment.name.toLowerCase().includes(lowerSearchTerm) ||
        lead.apartment.address.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (activeFilter === 'new') {
      leadsToDisplay = leadsToDisplay.filter(lead => lead.unreadByRealtor);
    }
    
    return leadsToDisplay.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
  }, [chatLeads, activeFilter, searchTerm]);

  const FilterButton = ({ filterValue, label, count, icon: Icon }) => (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveFilter(filterValue)}
      className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md
                  ${activeFilter === filterValue 
                    ? 'bg-upliving-primary text-white focus:ring-upliving-primary' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 focus:ring-upliving-primary/70 border border-slate-300'}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {label} 
      {typeof count === 'number' && 
        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold tabular-nums
                        ${activeFilter === filterValue ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
          {count}
        </span>
      }
    </motion.button>
  );

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
          <Logo iconSize="h-9 w-9" textSize="text-3xl" color="text-upliving-primary-light" />
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-5 rounded-lg text-sm transition-colors shadow-md hover:shadow-lg flex items-center"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
            Sair
          </motion.button>
        </div>
      </nav>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <motion.section 
          initial={{ opacity:0, y: -20 }} animate={{ opacity:1, y: 0 }} transition={{ delay: 0.1, duration: 0.4}}
          className="mb-8 p-6 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl shadow-2xl text-white"
        >
          <h2 className="text-3xl font-extrabold tracking-tight mb-1">Painel de Leads</h2>
          <p className="text-slate-300 mb-6">Acompanhe e gerencie todas as interações com seus clientes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-slate-600/50 p-5 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-5xl font-bold tabular-nums">{totalLeads}</p>
                <Bars3BottomLeftIcon className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-300 mt-1">Total de Leads</p>
            </div>
            <div className={`p-5 rounded-lg shadow-lg transition-all ${unreadLeadsCount > 0 ? 'bg-upliving-primary/80' : 'bg-slate-600/50'}`}>
              <div className="flex items-center justify-between">
                <p className="text-5xl font-bold tabular-nums">{unreadLeadsCount}</p>
                {unreadLeadsCount > 0 
                  ? <EnvelopeIcon className="w-10 h-10 text-white/80" /> 
                  : <EnvelopeOpenIcon className="w-10 h-10 text-slate-400" />}
              </div>
              <p className={`${unreadLeadsCount > 0 ? 'text-white' : 'text-slate-300'} mt-1`}>Leads Novos</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity:0, y: 20 }} animate={{ opacity:1, y: 0 }} transition={{ delay: 0.2, duration: 0.4}}
          className="mb-8"
        >
          <div className="bg-white p-5 rounded-xl shadow-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    placeholder="Buscar por cliente ID, nome do imóvel..."
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-transparent transition-shadow hover:shadow-md text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 justify-start md:justify-end">
                <FilterButton filterValue="all" label="Todos" icon={AdjustmentsHorizontalIcon} />
                <FilterButton filterValue="new" label="Novos" count={unreadLeadsCount} icon={EnvelopeIcon} />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredAndSortedLeads.length === 0 ? (
              <motion.div 
                key="no-leads"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y:-10 }}
                className="text-center py-16 bg-white rounded-xl shadow-md"
              >
                <InboxArrowDownIcon className="w-20 h-20 mx-auto text-slate-300 mb-6" />
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">
                  {searchTerm ? 'Nenhum lead corresponde à busca' : (activeFilter === 'new' ? 'Nenhum lead novo' : 'Nenhum lead encontrado')}
                </h3>
                <p className="text-slate-500">
                  {searchTerm ? 'Tente termos diferentes ou limpe a busca.' : (activeFilter === 'new' 
                    ? 'Você está em dia com todos os leads!' 
                    : 'Aguardando novos clientes demonstrarem interesse.')}
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="leads-list"
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredAndSortedLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} onOpenChat={openChatForRealtor} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </main>

      <footer className="bg-slate-900 text-slate-400 text-center p-8 mt-16 print:hidden">
        <p>&copy; {new Date().getFullYear()} UpLiving Imobiliária. Painel do Corretor.</p>
      </footer>
    </motion.div>
  );
};

export default RealtorDashboardPage;