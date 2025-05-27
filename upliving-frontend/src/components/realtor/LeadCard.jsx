import React from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, BuildingOfficeIcon, UserIcon, PhotoIcon, ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    }
  }
};

const LeadCard = ({ lead, onOpenChat }) => {
  if (!lead || !lead.apartment) {
    return (
      <motion.div variants={cardVariants} className="bg-white shadow-lg rounded-xl p-5 border-l-4 border-red-500">
        <p className="text-red-700 font-medium">Erro: Dados do lead incompletos.</p>
      </motion.div>
    );
  }

  const { apartment, clientId, messages, timestamp, lastActivity, unreadByRealtor } = lead;
  const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1] : null;
  const thumbnailUrl = apartment.imageUrls && apartment.imageUrls.length > 0 
    ? apartment.imageUrls[0] 
    : (apartment.generatedImageUrls && apartment.generatedImageUrls.length > 0 ? apartment.generatedImageUrls[0] : null);


  const timeSince = (dateInput) => {
    if (!dateInput) return 'N/A';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'N/A';
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return 'Agora';
    if (seconds < 60) return `${seconds}s atrás`;
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval}a`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval}m`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval}d`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval}h`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval}min`;
    return `${Math.floor(seconds)}s`;
  };

  return (
    <motion.div 
      variants={cardVariants}
      className={`bg-white rounded-2xl shadow-xl flex flex-col border-2
                  transition-all duration-300 ease-in-out hover:shadow-2xl group
                  ${unreadByRealtor 
                    ? 'border-upliving-primary animate-pulse-border-slow' 
                    : 'border-slate-200 hover:border-upliving-accent/70'}`}
    >
      <div className="h-44 w-full relative overflow-hidden rounded-t-2xl">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={`Imagem de ${apartment.name}`} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
            <PhotoIcon className="w-16 h-16 opacity-50" />
          </div>
        )}
        {unreadByRealtor && (
          <div className="absolute top-3 right-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-upliving-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-upliving-primary"></span>
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-upliving-primary transition-colors truncate" title={apartment.name}>
            {apartment.name}
          </h3>
          <p className="text-xs text-slate-500 flex items-center mt-1">
            <UserIcon className="w-3.5 h-3.5 inline mr-1.5 text-slate-400 flex-shrink-0" />
            Cliente: <span className="font-medium ml-1">{clientId}</span>
          </p>
        </div>

        {lastMessage ? (
          <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200 flex-grow min-h-[65px] max-h-[65px] overflow-hidden">
            <p className={`text-xs text-slate-600 ${lastMessage.sender === 'Cliente' ? 'italic' : ''}`}>
              <span className="font-semibold text-slate-700">{lastMessage.sender === 'Cliente' ? 'Cliente' : 'Corretor'}: </span>
              <span className="line-clamp-2">{lastMessage.text}</span>
            </p>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200 min-h-[65px] flex items-center justify-center">
            <p className="text-xs text-slate-500 italic">Novo lead, aguardando interação.</p>
          </div>
        )}
        
        <div className="text-xs text-slate-500 space-y-1.5 mb-4 mt-auto pt-3 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <span className="flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1.5 text-slate-400"/> Criado:</span>
            <span className="font-medium">{new Date(timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1.5 text-slate-400"/> Atividade:</span>
            <span className="font-medium text-upliving-primary">{timeSince(lastActivity)}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onOpenChat(lead.id)}
          className={`w-full flex items-center justify-center font-semibold py-3 px-4 rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl
                      focus:outline-none focus:ring-2  focus:ring-offset-2
                      ${unreadByRealtor 
                        ? 'bg-upliving-primary hover:bg-upliving-primary-dark text-white focus:ring-upliving-primary' 
                        : 'bg-slate-700 hover:bg-slate-800 text-white focus:ring-slate-600'}`}
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
          {unreadByRealtor ? 'Responder Lead' : 'Ver Conversa'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LeadCard;