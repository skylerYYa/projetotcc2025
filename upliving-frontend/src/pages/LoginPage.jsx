import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/common/Logo';
import { ArrowRightIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const loginSideImageUrl = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1470&q=80';

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 50 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6,
};

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const determineUserType = () => {
    if (location.state?.userType) {
      return location.state.userType;
    }
    if (location.pathname.includes('/corretor')) {
      return 'Corretor';
    }
    // Não precisamos de /admin aqui pois AdminLoginPage é um componente separado
    return 'Cliente';
  };
  const userType = determineUserType();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (userType === 'Cliente') {
      if (email === 'cliente@upliving.com' && password === 'cliente123') {
        localStorage.setItem('clientAuthToken', 'fakeClientToken');
        navigate(location.state?.from || '/cliente/dashboard', { replace: true });
      } else {
        setError('Email ou senha de cliente inválidos.');
      }
    } else if (userType === 'Corretor') {
      if (email === 'corretor@upliving.com' && password === 'corretor123') {
        localStorage.setItem('realtorAuthToken', 'fakeRealtorToken');
        navigate(location.state?.from || '/corretor/dashboard', { replace: true });
      } else {
        setError('Email ou senha de corretor inválidos.');
      }
    } else {
      setError('Tipo de usuário desconhecido para login.');
    }
  };

  const handleGoogleLogin = () => {
    setError('');
    console.log(`Login com Google para ${userType}`);
    alert(`Login com Google como ${userType} (ainda não implementado)`);
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
      <div
        className="relative hidden lg:flex w-1/2 items-end justify-center bg-gray-500 bg-cover bg-no-repeat p-12"
        style={{ backgroundImage: `url(${loginSideImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="z-10 text-left max-w-md"
        >
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
            Bem-vindo de volta!
          </h1>
          <p className="text-lg text-slate-200 drop-shadow-md">
            Acesse sua conta <span className="font-semibold text-upliving-primary-light">{userType}</span> e continue de onde parou. A UpLiving facilita sua jornada no mundo imobiliário.
          </p>
        </motion.div>
      </div>

      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="text-center lg:text-left mb-10">
            <Logo className="justify-center lg:justify-start mb-6" iconSize="h-10 w-10" textSize="text-3xl" />
            <h2 className="text-3xl font-bold text-slate-800">
              Login de {userType}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Insira seus dados para continuar.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleLogin} className="space-y-5"
          >
            <div className="relative">
              <label className="sr-only" htmlFor="email">Email</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150"
                id="email"
                type="email"
                placeholder={`${userType.toLowerCase()}@upliving.com`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <label className="sr-only" htmlFor="password">Senha</label>
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150"
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm font-medium text-center py-2 px-3 bg-red-100 border border-red-300 rounded-md">{error}</p>}
            
            <div className="pt-2">
              <button
                className="w-full bg-upliving-primary hover:bg-upliving-primary-dark text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center"
                type="submit"
              >
                Entrar
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            </div>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-slate-50 text-slate-500">Ou</span></div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-lg border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2 text-red-500" viewBox="0 0 24 24" fill="currentColor"> <path d="M21.856 10.204c.078.59.117 1.196.117 1.814 0 6.29-4.586 10.858-10.858 10.858-5.973 0-10.858-4.885-10.858-10.858s4.885-10.858 10.858-10.858c3.06 0 5.42.963 7.177 2.803l-2.49 2.44c-1.018-.984-2.367-1.58-3.684-1.58-3.318 0-6.245 2.804-6.245 6.195s2.927 6.195 6.245 6.195c3.773 0 5.16-2.31 5.408-3.837h-5.408v-3.313h9.826z"/> </svg>
                Entrar com Google
              </button>
            </div>
          </motion.form>
          <p className="text-center text-sm text-slate-600 mt-10">
            Não tem uma conta?{' '}
            <Link
              to={userType === 'Corretor' ? "/corretor/registrar" : "/cliente/registrar"}
              state={{ userType }}
              className="font-semibold text-upliving-primary hover:text-upliving-primary-dark hover:underline"
            >
              Crie uma agora
            </Link>
          </p>
           <p className="text-center text-gray-400 text-xs mt-6">
            {userType === 'Cliente' && 'Teste: cliente@upliving.com / cliente123'}
            {userType === 'Corretor' && 'Teste: corretor@upliving.com / corretor123'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;