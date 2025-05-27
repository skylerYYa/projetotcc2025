import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinIcon, ArrowsPointingOutIcon, HomeIcon, InboxIcon, CurrencyDollarIcon, EyeIcon, ChatBubbleLeftEllipsisIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useChat } from '../../contexts/ChatContext';

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    }
  }
};

const ApartmentCard = ({ apartment }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { openChatForClient } = useChat();

  if (!apartment) {
    return <motion.div variants={cardVariants} className="bg-slate-200 rounded-2xl shadow-lg h-[520px] animate-pulse"></motion.div>;
  }

  const { id, name, address, size, rooms, parkingSpots, price, type, features, imageUrls, generatedImageUrls, description } = apartment;

  const effectiveGalleryImages = (generatedImageUrls && generatedImageUrls.length > 0)
                        ? generatedImageUrls
                        : (imageUrls && imageUrls.length > 0 ? imageUrls : []);

  const handleNextImage = (e) => {
    e.stopPropagation();
    const numImages = effectiveGalleryImages.length || 1;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % numImages);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const numImages = effectiveGalleryImages.length || 1;
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + numImages) % numImages);
  };

  const handleInitiateChat = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (apartment) {
      openChatForClient(apartment);
    } else {
      console.error("ApartmentCard: Dados do apartamento indisponíveis para iniciar chat.");
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      // As animações de initial/animate/exit são melhor controladas pelo AnimatePresence no pai (ClientDashboardPage)
      // ao mapear a lista. Ou com whileInView/viewport aqui se não houver stagger do pai.
      // initial="hidden" 
      // animate="visible"
      // exit="hidden" // Para quando o card é removido (ex: por filtro)
      layout // Anima mudanças de layout se a posição do card mudar
      className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full border border-slate-200 hover:border-upliving-primary/30 transition-all duration-300 group"
    >
      <div className="relative h-56 sm:h-64"> {/* Altura da imagem */}
        {effectiveGalleryImages.length > 0 ? (
          <img
            src={effectiveGalleryImages[currentImageIndex]}
            alt={`Imagem de ${name || 'Imóvel'} ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
            <PhotoIcon className="w-20 h-20 opacity-70" />
          </div>
        )}

        {effectiveGalleryImages.length > 1 && (
          <>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevImage}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/40 text-white p-2.5 rounded-full hover:bg-black/60 transition-all focus:outline-none z-10 backdrop-blur-sm"
              aria-label="Imagem anterior"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleNextImage}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/40 text-white p-2.5 rounded-full hover:bg-black/60 transition-all focus:outline-none z-10 backdrop-blur-sm"
              aria-label="Próxima imagem"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </motion.button>
          </>
        )}
        {effectiveGalleryImages.length > 0 && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full z-10 backdrop-blur-sm">
            {currentImageIndex + 1} / {effectiveGalleryImages.length}
            </div>
        )}
        {type && (
            <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg tracking-wider
                            ${type === 'Venda' ? 'bg-upliving-primary' : 'bg-upliving-accent'}`}>
            {type.toUpperCase()}
            </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 group-hover:text-upliving-primary transition-colors mb-1 truncate" title={name || 'Nome indisponível'}>
            {name || 'Imóvel Exclusivo'}
        </h3>
        <p className="text-xs text-slate-500 mb-3 flex items-center">
          <MapPinIcon className="w-4 h-4 mr-1.5 flex-shrink-0 text-slate-400" />
          <span className="truncate" title={address || 'Endereço indisponível'}>{address || 'Localização Privilegiada'}</span>
        </p>

        <p className="text-slate-600 text-sm mb-4 flex-grow min-h-[40px] leading-relaxed line-clamp-2">
          {description || 'Descubra mais sobre este incrível imóvel.'}
        </p>

        <div className="grid grid-cols-3 gap-x-3 gap-y-2 text-sm text-slate-700 mb-4 pt-3 border-t border-slate-100">
          <span className="flex items-center" title="Área útil"><ArrowsPointingOutIcon className="w-4 h-4 mr-1.5 text-upliving-primary flex-shrink-0" /> {size || '?'} m²</span>
          <span className="flex items-center" title="Quartos"><HomeIcon className="w-4 h-4 mr-1.5 text-upliving-primary flex-shrink-0" /> {rooms || '?'} qts</span>
          <span className="flex items-center" title="Vagas"><InboxIcon className="w-4 h-4 mr-1.5 text-upliving-primary flex-shrink-0" /> {parkingSpots || 0} vg</span>
        </div>
        
        {features && features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {features.slice(0, 2).map(feature => (
                <span key={feature} className="bg-upliving-primary/10 text-upliving-primary-dark px-2.5 py-1 rounded-full text-xs font-medium">
                  {feature}
                </span>
              ))}
              {features.length > 2 && <span className="text-upliving-primary-dark text-xs font-medium self-center">+{features.length - 2} mais</span>}
            </div>
          </div>
        )}

        <div className="mb-5 mt-auto">
          <p className="text-2xl font-extrabold text-upliving-primary flex items-center">
            <span className="text-lg font-medium mr-1">R$</span>
            {price || 'A consultar'}
            {type === 'Aluguel' && <span className="text-sm font-normal text-slate-500 ml-1">/mês</span>}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/cliente/apartamento/${id}`}
              className="flex-1 text-center bg-upliving-accent hover:bg-upliving-accent-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <EyeIcon className="w-5 h-5 mr-2" />
              Ver Detalhes
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInitiateChat}
              className="flex-1 text-center bg-upliving-primary hover:bg-upliving-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <ChatBubbleLeftEllipsisIcon className="w-5 h-5 mr-2" />
              Tenho Interesse
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApartmentCard;