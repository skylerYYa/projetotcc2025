import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApartments } from '../../contexts/ApartmentContext';
import ApartmentCard from '../../components/common/ApartmentCard';
import Logo from '../../components/common/Logo';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon, UserCircleIcon, FunnelIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

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
      staggerChildren: 0.07, // Anima os filhos em sequência mais rápido
      delayChildren: 0.1,
    },
  },
};

const ClientDashboardPage = () => {
  const navigate = useNavigate();
  const { apartments } = useApartments();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRooms, setMinRooms] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('clientAuthToken');
    navigate('/cliente/login');
  };

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/\./g, '').replace(/,/, '.').replace('/mês', '').trim()) || 0;
  };
  
  const resetFilters = () => {
    setSearchTerm(''); setFilterType(''); setMinPrice(''); setMaxPrice(''); setMinRooms('');
  };

  const activeAndFilteredApartments = useMemo(() => {
    return apartments.filter(apt => {
      if (!apt.active) return false;
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearchTerm = apt.name.toLowerCase().includes(lowerSearchTerm) ||
                                apt.address.toLowerCase().includes(lowerSearchTerm) ||
                                apt.description.toLowerCase().includes(lowerSearchTerm) ||
                                (apt.features && apt.features.some(f => f.toLowerCase().includes(lowerSearchTerm)));
      const matchesType = filterType ? apt.type === filterType : true;
      const priceAsNumber = parsePrice(apt.price);
      const matchesMinPrice = minPrice ? priceAsNumber >= parseFloat(minPrice) : true;
      const matchesMaxPrice = maxPrice ? priceAsNumber <= parseFloat(maxPrice) : true;
      const matchesMinRooms = minRooms ? apt.rooms >= parseInt(minRooms) : true;
      return matchesSearchTerm && matchesType && matchesMinPrice && matchesMaxPrice && matchesMinRooms;
    }).sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
  }, [apartments, searchTerm, filterType, minPrice, maxPrice, minRooms]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen bg-slate-100"
    >
      <nav className="bg-white shadow-lg sticky top-0 z-50 print:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo iconSize="h-9 w-9" textSize="text-3xl" />
            <div className="flex items-center space-x-4">
               <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => alert('Minha Conta - A implementar')}
                className="text-slate-600 hover:text-upliving-primary p-2 rounded-full hover:bg-slate-100 transition-colors"
                title="Minha Conta"
              >
                <UserCircleIcon className="w-7 h-7" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-upliving-primary hover:bg-upliving-primary-dark text-white font-semibold py-2.5 px-5 rounded-lg text-sm transition-colors shadow-md hover:shadow-lg"
              >
                Sair
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-3 tracking-tight">
            Encontre seu <span className="text-upliving-primary">Lar Ideal</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore nossa seleção exclusiva de imóveis e descubra o lugar perfeito para você.
          </p>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 p-5 sm:p-6 bg-white rounded-xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Busque por bairro, cidade, código ou característica..."
                className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-transparent transition-shadow hover:shadow-md text-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="w-full md:w-auto flex items-center justify-center px-6 py-3.5 bg-upliving-accent hover:bg-upliving-accent-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 whitespace-nowrap"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
              {showFilters ? 'Ocultar Filtros' : 'Filtrar'}
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '24px' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4">Opções de Filtro Avançado</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div>
                      <label htmlFor="filterType" className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                      <select id="filterType" value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary sm:text-sm">
                        <option value="">Todos</option>
                        <option value="Venda">Venda</option>
                        <option value="Aluguel">Aluguel</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="minPrice" className="block text-sm font-medium text-slate-700 mb-1">Preço Mín. (R$)</label>
                      <input type="number" id="minPrice" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Ex: 100000" className="w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-upliving-primary sm:text-sm" />
                    </div>
                     <div>
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-slate-700 mb-1">Preço Máx. (R$)</label>
                        <input type="number" id="maxPrice" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Ex: 500000" className="w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-upliving-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="minRooms" className="block text-sm font-medium text-slate-700 mb-1">Quartos (Mín.)</label>
                        <input type="number" id="minRooms" value={minRooms} onChange={e => setMinRooms(e.target.value)} placeholder="Ex: 2" className="w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-upliving-primary sm:text-sm" />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                        onClick={resetFilters}
                        className="flex items-center text-sm text-slate-600 hover:text-upliving-primary font-medium py-2 px-4 rounded-md hover:bg-slate-100 transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5 mr-1.5" />
                        Limpar Filtros
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeAndFilteredApartments.length > 0 ? (
            <motion.div 
              key="apartment-list" // Key para AnimatePresence identificar como um único bloco que pode mudar
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden" // Para quando a lista inteira some
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8"
            >
              {activeAndFilteredApartments.map((apt) => (
                // ApartmentCard já tem suas próprias variants, que serão acionadas pelo staggerChildren
                <ApartmentCard key={apt.id} apartment={apt} /> 
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="no-apartments"
              initial={{ opacity: 0, y:10 }} animate={{ opacity: 1, y:0 }} exit={{ opacity: 0, y: -10 }}
              className="text-center py-16"
            >
              <BuildingStorefrontIcon className="w-24 h-24 mx-auto text-slate-300 mb-6" />
              <h3 className="text-2xl font-semibold text-slate-700 mb-3">Nenhum imóvel encontrado</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Tente ajustar seus filtros ou termos de busca. Novos imóveis são adicionados diariamente!
              </p>
              {(searchTerm || filterType || minPrice || maxPrice || minRooms) && (
                   <button
                      onClick={resetFilters}
                      className="mt-8 inline-flex items-center text-sm text-upliving-primary hover:text-upliving-primary-dark font-semibold py-2.5 px-5 rounded-lg border-2 border-upliving-primary hover:bg-upliving-primary/10 transition-colors"
                  >
                      <XMarkIcon className="w-5 h-5 mr-1.5" />
                      Limpar Busca e Filtros
                  </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

       <footer className="bg-slate-800 text-slate-400 text-center p-8 mt-16 print:hidden">
        <p>&copy; {new Date().getFullYear()} UpLiving Imobiliária. Todos os direitos reservados.</p>
      </footer>
    </motion.div>
  );
};

export default ClientDashboardPage;