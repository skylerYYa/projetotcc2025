import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../components/common/Logo';
import { ArrowRightOnRectangleIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline';

const adminLoginSideImageUrl = 'https://images.unsplash.com/photo-1553877522-c36980345825?auto=format&fit=crop&w=1470&q=80';

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.95 },
};

const pageTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  duration: 0.4,
};

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(''); // Mudado de email para username para admin
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError('');
    if (username === 'admin' && password === 'password123') {
      localStorage.setItem('adminAuthToken', 'fakeAdminToken');
      navigate(location.state?.from || '/admin/dashboard', { replace: true });
    } else {
      setError('Usuário ou senha de administrador inválidos.');
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen flex items-stretch text-slate-800 bg-slate-900"
    >
      <div
        className="relative hidden lg:flex w-1/2 items-center justify-center bg-slate-800 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${adminLoginSideImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="z-10 text-center p-10"
        >
          <Logo className="justify-center mb-8" iconSize="h-16 w-16" textSize="text-5xl" color="text-upliving-primary-light" />
          <h1 className="text-3xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
            Painel de Controle UpLiving
          </h1>
          <p className="text-lg text-slate-300 drop-shadow-sm">
            Gerenciamento centralizado para sua imobiliária.
          </p>
        </motion.div>
      </div>

      <div className="lg:w-1/2 w-full flex items-center justify-center bg-slate-100 p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="text-center lg:text-left mb-10">
             <div className="lg:hidden mb-8">
                <Logo className="justify-center" iconSize="h-10 w-10" textSize="text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
              Acesso Administrativo
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Por favor, insira suas credenciais.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleAdminLogin} className="space-y-6"
          >
            <div className="relative">
              <label className="sr-only" htmlFor="username">Usuário</label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                className="w-full pl-10 pr-3 py-3.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150"
                id="username"
                type="text"
                placeholder="Usuário (admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <label className="sr-only" htmlFor="password">Senha</label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <KeyIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                className="w-full pl-10 pr-3 py-3.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150"
                id="password"
                type="password"
                placeholder="Senha (password123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm font-medium text-center py-2 px-3 bg-red-100 border border-red-300 rounded-md">{error}</p>}
            
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-upliving-primary hover:bg-upliving-primary-dark text-white font-bold py-3.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                type="submit"
              >
                Entrar no Painel
                <ArrowRightOnRectangleIcon className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </motion.form>
          <p className="text-center text-xs text-slate-400 mt-8">
            Este é um acesso restrito para administradores do sistema UpLiving.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLoginPage;