import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApartments } from '../../contexts/ApartmentContext';
import { useChat } from '../../contexts/ChatContext';
import Logo from '../../components/common/Logo';
import {
  ArrowLeftIcon, MapPinIcon, ArrowsPointingOutIcon, CurrencyDollarIcon,
  ChatBubbleLeftEllipsisIcon, HomeIcon, InboxIcon, UsersIcon, CheckCircleIcon,
  ChevronLeftIcon, ChevronRightIcon, PhotoIcon, NoSymbolIcon, TagIcon,
  BuildingOfficeIcon as BuildingOfficeIconOutline // Para detalhes do imóvel se BuildingOfficeIconSolid for usado em outro lugar
} from '@heroicons/react/24/outline';
import { BuildingOfficeIcon as BuildingOfficeIconSolid } from '@heroicons/react/24/solid'; // Para avatar do corretor, por exemplo


const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  in: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] } },
  out: { opacity: 0, scale: 0.98, y: -10, transition: { duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] } },
};

const sectionVariants = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" }
  }
});

const ApartmentDetailPage = () => {
  const { apartmentId } = useParams();
  const { apartments } = useApartments();
  const { openChatForClient } = useChat();
  const navigate = useNavigate();
  
  const [apartment, setApartment] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundApartment = apartments.find(apt => apt.id === apartmentId);
    if (foundApartment) {
      setApartment(foundApartment);
    }
    setLoading(false);
    window.scrollTo(0, 0);
  }, [apartmentId, apartments]);

  // Prioriza generatedImageUrls, depois imageUrls
  const displayGalleryImages = useMemo(() => {
    if (apartment?.generatedImageUrls && apartment.generatedImageUrls.length > 0) {
      return apartment.generatedImageUrls;
    }
    if (apartment?.imageUrls && apartment.imageUrls.length > 0) {
      return apartment.imageUrls;
    }
    return [];
  }, [apartment]);


  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % (displayGalleryImages.length || 1));
  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + (displayGalleryImages.length || 1)) % (displayGalleryImages.length || 1));
  const handleThumbnailClick = (index) => setCurrentImageIndex(index);
  
  const handleInitiateChat = () => {
    if (apartment) {
        openChatForClient(apartment);
    } else {
        alert("Erro ao iniciar chat: dados do imóvel não encontrados.");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100 animate-pulse">
        <header className="bg-white shadow-sm h-20"></header>
        <div className="container mx-auto p-8 flex-grow">
          <div className="bg-slate-200 h-96 rounded-xl mb-8"></div>
          <div className="bg-slate-200 h-12 w-3/4 rounded mb-4"></div>
          <div className="bg-slate-200 h-8 w-1/2 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="bg-slate-200 h-6 rounded w-full"></div>
            <div className="bg-slate-200 h-6 rounded w-5/6"></div>
            <div className="bg-slate-200 h-6 rounded w-3/4"></div>
          </div>
        </div>
        <footer className="bg-slate-200 h-20"></footer>
      </div>
    );
  }

  if (!apartment) {
    return (
      <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-8 text-center">
        <NoSymbolIcon className="w-24 h-24 text-red-400 mb-4" />
        <h2 className="text-3xl font-semibold text-slate-800 mb-2">Imóvel Não Encontrado</h2>
        <p className="text-slate-600 mb-6 max-w-md">
          O imóvel que você está procurando não foi encontrado ou não está mais disponível.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/cliente/dashboard')}
          className="bg-upliving-primary hover:bg-upliving-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center shadow-md hover:shadow-lg"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Voltar para Imóveis
        </motion.button>
      </motion.div>
    );
  }

  const formattedPrice = apartment.price ? `${apartment.price}` : 'A Consultar';

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen bg-slate-100 text-slate-800"
    >
      <header className="bg-white shadow-md sticky top-0 z-40 print:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.button
              whileHover={{ x: -2, transition: { duration: 0.2 } }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center text-slate-600 hover:text-upliving-primary transition-colors p-2 rounded-lg hover:bg-slate-100"
              title="Voltar"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-1 sm:mr-2" />
              <span className="font-semibold text-sm hidden sm:inline">Voltar</span>
            </motion.button>
            <Logo iconSize="h-8 w-8" textSize="text-2xl" />
            <div className="w-20 sm:w-28"> {/* Espaçador */} </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={sectionVariants(0)} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Galeria e Infos Primárias */}
          <div className="lg:flex">
            {/* Galeria */}
            <div className="lg:w-[60%] xl:w-2/3">
              <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[16/10] bg-slate-200">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={displayGalleryImages.length > 0 ? displayGalleryImages[currentImageIndex] : 'https://via.placeholder.com/1200x800/e2e8f0/94a3b8?Text=Imagem+Indisponível'}
                    alt={`Imagem ${currentImageIndex + 1} de ${apartment.name}`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {displayGalleryImages.length > 1 && (
                  <>
                    <button onClick={handlePrevImage} className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-all focus:outline-none z-10 backdrop-blur-sm shadow-lg"><ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" /></button>
                    <button onClick={handleNextImage} className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-all focus:outline-none z-10 backdrop-blur-sm shadow-lg"><ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" /></button>
                  </>
                )}
                 {displayGalleryImages.length > 0 && (
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full z-10 backdrop-blur-sm">
                        {currentImageIndex + 1} / {displayGalleryImages.length}
                    </div>
                 )}
              </div>
              {displayGalleryImages.length > 1 && (
                <div className="p-3 sm:p-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 bg-slate-50 border-t border-slate-200">
                  {displayGalleryImages.map((imgSrc, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`aspect-square rounded-md sm:rounded-lg overflow-hidden border-2 focus:outline-none transition-all duration-200
                                  ${index === currentImageIndex ? 'border-upliving-primary shadow-lg scale-105' : 'border-transparent hover:border-slate-400 opacity-75 hover:opacity-100'}`}
                      whileHover={{ scale: index === currentImageIndex ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={imgSrc} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações e Ação */}
            <div className="lg:w-[40%] xl:w-1/3 p-6 sm:p-8 flex flex-col">
                {apartment.type && (
                  <span className={`self-start inline-block px-3.5 py-1.5 rounded-full text-sm font-bold text-white mb-4 shadow-md tracking-wider
                                  ${apartment.type === 'Venda' ? 'bg-upliving-primary' : 'bg-upliving-accent'}`}>
                    {apartment.type.toUpperCase()}
                  </span>
                )}
                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{apartment.name}</h1>
                <div className="text-slate-500 flex items-center mb-5 text-md">
                  <MapPinIcon className="w-5 h-5 mr-2 flex-shrink-0 text-slate-400" />
                  {apartment.address}
                </div>
                
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <p className="text-4xl lg:text-5xl font-extrabold text-upliving-primary">
                    <span className="text-2xl font-semibold mr-0.5">R$</span>{formattedPrice}
                    {apartment.type === 'Aluguel' && <span className="text-lg font-normal text-slate-500 ml-1">/mês</span>}
                  </p>
                </div>

              <div className="space-y-3 text-sm text-slate-700 mb-6">
                <p className="flex items-center"><ArrowsPointingOutIcon className="w-5 h-5 mr-3 text-upliving-primary-dark flex-shrink-0" /> <strong>Área Útil:</strong> <span className="ml-auto font-medium">{apartment.size || '?'} m²</span></p>
                <p className="flex items-center"><HomeIcon className="w-5 h-5 mr-3 text-upliving-primary-dark flex-shrink-0" /> <strong>Quartos:</strong> <span className="ml-auto font-medium">{apartment.rooms || '?'}</span></p>
                {typeof apartment.suites === 'number' && <p className="flex items-center"><UsersIcon className="w-5 h-5 mr-3 text-upliving-primary-dark flex-shrink-0" /> <strong>Suítes:</strong> <span className="ml-auto font-medium">{apartment.suites}</span></p>}
                {typeof apartment.bathrooms === 'number' && <p className="flex items-center"><BuildingOfficeIconOutline className="w-5 h-5 mr-3 text-upliving-primary-dark flex-shrink-0" /> <strong>Banheiros:</strong> <span className="ml-auto font-medium">{apartment.bathrooms}</span></p>}
                {typeof apartment.parkingSpots === 'number' && <p className="flex items-center"><InboxIcon className="w-5 h-5 mr-3 text-upliving-primary-dark flex-shrink-0" /> <strong>Vagas:</strong> <span className="ml-auto font-medium">{apartment.parkingSpots}</span></p>}
              </div>

              <div className="mt-auto pt-6">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInitiateChat}
                  className="w-full flex items-center justify-center px-8 py-4 bg-upliving-primary hover:bg-upliving-primary-dark text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ChatBubbleLeftEllipsisIcon className="w-7 h-7 mr-3" />
                  Tenho Interesse!
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Descrição e Características em seções separadas abaixo */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.section variants={sectionVariants(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Sobre este Imóvel</h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                <p>{apartment.description || "Este imóvel incrível aguarda sua visita. Entre em contato para mais detalhes!"}</p>
                </div>
            </motion.section>

            {apartment.features && apartment.features.length > 0 && (
                <motion.section variants={sectionVariants(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-5 tracking-tight">Comodidades</h2>
                <ul className="space-y-3">
                    {apartment.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-700">
                        <CheckCircleIcon className="w-6 h-6 mr-3 text-upliving-primary flex-shrink-0" />
                        <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                    ))}
                </ul>
                </motion.section>
            )}
          </div>
        </motion.div>
      </main>

      <footer className="bg-slate-900 text-slate-400 text-center p-10 mt-16 print:hidden">
        <p>&copy; {new Date().getFullYear()} UpLiving Imobiliária. Viva onde você ama.</p>
      </footer>
    </motion.div>
  );
};

export default ApartmentDetailPage;