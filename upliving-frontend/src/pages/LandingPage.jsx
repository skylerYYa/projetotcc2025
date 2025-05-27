import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/common/Logo';
import {
  BuildingOffice2Icon,
  UsersIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const heroBackgroundImage = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1920&q=80'; 

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6,
};

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      ease: "easeOut",
      duration: 0.5,
    },
  }),
};

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminAccess = (e) => {
    e.preventDefault();
    navigate('/admin/login');
  };

  const features = [
    {
      name: 'Busca Inteligente',
      description: 'Filtros avançados e personalizados para você encontrar o imóvel perfeito sem esforço.',
      icon: MagnifyingGlassIcon,
    },
    {
      name: 'Experiência Inovadora',
      description: 'Navegação moderna e intuitiva, otimizada para todos os seus dispositivos.',
      icon: SparklesIcon,
    },
    {
      name: 'Suporte Especializado',
      description: 'Corretores qualificados e prontos para te guiar em cada etapa da sua jornada.',
      icon: ChatBubbleOvalLeftEllipsisIcon,
    },
     {
      name: 'Segurança e Confiança',
      description: 'Processos transparentes e seguros, garantindo sua tranquilidade em todas as negociações.',
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden"
    >
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="container mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Logo iconSize="h-9 w-9" textSize="text-3xl" />
          </div>
          <div className="flex lg:flex-1 lg:justify-end space-x-6 items-center">
            <Link to="/cliente/login" state={{ userType: 'Cliente' }} className="text-sm font-semibold leading-6 text-slate-700 hover:text-upliving-primary transition-colors">
              Sou Cliente
            </Link>
            <Link
              to="/corretor/login"
              state={{ userType: 'Corretor' }}
              className="rounded-md bg-upliving-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-upliving-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-upliving-primary transition-all hover:scale-105"
            >
              Sou Corretor
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative isolate pt-14 min-h-[85vh] md:min-h-screen flex items-center">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#34d399] to-[#6366f1] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div 
            className="absolute inset-0 -z-20 h-full w-full object-cover" 
            style={{ backgroundImage: `url(${heroBackgroundImage})`, backgroundPosition: 'center center' }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="container mx-auto py-20 sm:py-32 lg:py-30 px-6 lg:px-8 text-center relative z-10">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl !leading-tight drop-shadow-xl"
            >
                Encontre o lar dos seus sonhos. <br className="hidden sm:inline"/> <span className="text-upliving-primary-light">Simples. Moderno. UpLiving.</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-lg leading-8 text-slate-200 max-w-2xl mx-auto drop-shadow-lg"
            >
                Explore milhares de imóveis com fotos incríveis, tours virtuais e todas as informações que você precisa para tomar a melhor decisão. Com a UpLiving, sua busca é mais inteligente e prazerosa.
            </motion.p>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-10 flex items-center justify-center gap-x-6"
            >
                <Link
                    to="/cliente/dashboard"
                    className="group rounded-lg bg-upliving-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-upliving-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-upliving-primary transition-all duration-300 ease-in-out hover:scale-105 flex items-center"
                >
                    Buscar Imóveis
                    <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </motion.div>
        </div>
      </div>

      {/* Seção "Por que UpLiving?" */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h2 variants={featureVariants} className="text-base font-semibold leading-7 text-upliving-primary">Nossos Diferenciais</motion.h2>
            <motion.p variants={featureVariants} className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              A Experiência UpLiving
            </motion.p>
            <motion.p variants={featureVariants} className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Tecnologia e atendimento humanizado para simplificar sua jornada no mercado imobiliário.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={featureVariants}
                className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl shadow-lg hover:shadow-upliving-primary/20 transition-all duration-300 ease-in-out hover:scale-[1.03]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-upliving-primary text-white mb-5 shadow-md">
                  <feature.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold leading-7 text-slate-900 mb-2">{feature.name}</h3>
                <p className="text-base leading-7 text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 print:hidden">
        <div className="container mx-auto px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:gap-12">
            <div className="space-y-5">
                <Logo iconSize="h-9 w-9" textSize="text-3xl" color="text-upliving-primary-light"/>
              <p className="text-sm leading-6 text-slate-400">
                Conectando você ao seu próximo lar com inovação, design e a melhor tecnologia do mercado.
              </p>
              <div className="flex space-x-5">
                <a href="#" className="text-slate-400 hover:text-upliving-primary-light transition-colors"><span className="sr-only">Facebook</span>{/* Substituir por SVG */}FB</a>
                <a href="#" className="text-slate-400 hover:text-upliving-primary-light transition-colors"><span className="sr-only">Instagram</span>{/* Substituir por SVG */}IG</a>
                <a href="#" className="text-slate-400 hover:text-upliving-primary-light transition-colors"><span className="sr-only">LinkedIn</span>{/* Substituir por SVG */}LI</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-semibold leading-6 text-white">Navegue</h3>
              <ul role="list" className="mt-5 space-y-3">
                <li><Link to="/cliente/dashboard" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">Buscar Imóveis</Link></li>
                <li><a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">Como Comprar</a></li>
                <li><a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">Como Alugar</a></li>
                <li><a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">Anuncie seu Imóvel</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-md font-semibold leading-6 text-white">UpLiving</h3>
              <ul role="list" className="mt-5 space-y-3">
                <li><a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">Blog & Notícias</a></li>
                <li><a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">Trabalhe Conosco</a></li>
                <li><a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
             <div>
              <h3 className="text-md font-semibold leading-6 text-white">Suporte</h3>
              <ul role="list" className="mt-5 space-y-3">
                <li><a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">Termos de Uso</a></li>
                {process.env.NODE_ENV === 'development' && (
                    <li>
                        <a
                        href="#"
                        onClick={handleAdminAccess}
                        className="text-sm leading-6 text-slate-500 hover:text-upliving-primary-light transition-colors"
                        title="Acesso Administrativo"
                        >
                        Admin Console
                        </a>
                    </li>
                )}
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-slate-700 pt-8 text-center">
            <p className="text-xs leading-5 text-slate-500">&copy; {new Date().getFullYear()} UpLiving Imobiliária. Inovação no mercado imobiliário.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;