import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/common/Logo';
import { UserPlusIcon, EnvelopeIcon, LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const registerSideImageUrl = 'https://images.unsplash.com/photo-1560185007-c5ca915a0150?auto=format&fit=crop&w=1470&q=80';

const pageVariants = {
  initial: { opacity: 0, x: 50 }, 
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 }, 
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6,
};

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const determineUserType = () => {
    if (location.state?.userType) {
      return location.state.userType;
    }
    if (location.pathname.includes('/corretor')) {
      return 'Corretor';
    }
    return 'Cliente';
  };
  const userType = determineUserType();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }
    console.log(`Registro para ${userType}:`, { name, email, password });
    alert(`Conta para ${userType} com email ${email} registrada com sucesso! (simulação) Redirecionando para login.`);
    navigate(userType === 'Corretor' ? '/corretor/login' : '/cliente/login', { state: { userType } });
  };

  const handleGoogleRegister = () => {
    setError('');
    console.log(`Registro com Google para ${userType}`);
    alert(`Registro com Google como ${userType} (ainda não implementado)`);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen flex items-stretch text-slate-800 bg-slate-50"
    >
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
        <div className="w-full max-w-sm">
           <div className="text-center lg:text-left mb-10">
            <Logo className="justify-center lg:justify-start mb-6" iconSize="h-10 w-10" textSize="text-3xl" />
            <h2 className="text-3xl font-bold text-slate-800">
              Criar Conta de {userType}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Junte-se à UpLiving e encontre seu espaço.
            </p>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleRegister} className="space-y-4"
          >
            <div className="relative">
              <label className="sr-only" htmlFor="name">Nome Completo</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCircleIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150"
                id="name" type="text" placeholder="Nome Completo"
                value={name} onChange={(e) => setName(e.target.value)} required
              />
            </div>
            <div className="relative">
              <label className="sr-only" htmlFor="email">Email</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150"
                id="email" type="email" placeholder="Seu melhor email"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
            <div className="relative">
              <label className="sr-only" htmlFor="password">Senha</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150"
                id="password" type="password" placeholder="Crie uma senha"
                value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>
            <div className="relative">
              <label className="sr-only" htmlFor="confirmPassword">Confirmar Senha</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150"
                id="confirmPassword" type="password" placeholder="Confirme a senha"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
              />
            </div>

            {error && <p className="text-red-600 text-sm font-medium text-center py-2 px-3 bg-red-100 border border-red-300 rounded-md">{error}</p>}
            
            <div className="pt-2">
              <button
                className="w-full bg-upliving-primary hover:bg-upliving-primary-dark text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center"
                type="submit"
              >
                Criar Minha Conta
                <UserPlusIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
            
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-slate-50 text-slate-500">Ou</span></div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full bg-white hover:bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-lg border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2 text-red-500" viewBox="0 0 24 24" fill="currentColor"> <path d="M21.856 10.204c.078.59.117 1.196.117 1.814 0 6.29-4.586 10.858-10.858 10.858-5.973 0-10.858-4.885-10.858-10.858s4.885-10.858 10.858-10.858c3.06 0 5.42.963 7.177 2.803l-2.49 2.44c-1.018-.984-2.367-1.58-3.684-1.58-3.318 0-6.245 2.804-6.245 6.195s2.927 6.195 6.245 6.195c3.773 0 5.16-2.31 5.408-3.837h-5.408v-3.313h9.826z"/> </svg>
                Registrar com Google
              </button>
            </div>
          </motion.form>
          <p className="text-center text-sm text-slate-600 mt-10">
            Já possui uma conta?{' '}
            <Link
              to={userType === 'Corretor' ? "/corretor/login" : "/cliente/login"}
              state={{ userType }}
              className="font-semibold text-upliving-primary hover:text-upliving-primary-dark hover:underline"
            >
              Acesse aqui
            </Link>
          </p>
        </div>
      </div>
      
      <div
        className="relative hidden lg:flex w-1/2 items-end justify-center bg-gray-500 bg-cover bg-no-repeat p-12 order-1 lg:order-2"
        style={{ backgroundImage: `url(${registerSideImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="z-10 text-left max-w-md"
        >
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
            Um novo começo espera por você.
          </h1>
          <p className="text-lg text-slate-200 drop-shadow-md">
            Crie sua conta UpLiving e dê o primeiro passo para encontrar o imóvel perfeito com facilidade e segurança.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;