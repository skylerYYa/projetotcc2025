import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../contexts/ChatContext';
import { PaperAirplaneIcon, XMarkIcon, ChatBubbleLeftEllipsisIcon, UserCircleIcon as UserCircleIconSolid, BuildingOfficeIcon as BuildingOfficeIconSolid } from '@heroicons/react/24/solid';
import { UserCircleIcon as UserCircleIconOutline } from '@heroicons/react/24/outline';


const widgetVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    y: 30, 
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const ChatWidget = () => {
  const {
    isChatWidgetOpen,
    activeChatSession,
    closeChatWidget,
    sendChatMessage,
    currentUserInteractingRole,
  } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const currentMessages = activeChatSession ? activeChatSession.messages : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatWidgetOpen) {
        scrollToBottom();
    }
  }, [currentMessages, isChatWidgetOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !activeChatSession) return;
    sendChatMessage(newMessage.trim());
    setNewMessage('');
  };

  // Não renderiza nada se o chat não estiver aberto ou sem sessão ativa
  // AnimatePresence cuidará da animação de saída
  if (!isChatWidgetOpen || !activeChatSession) {
    return null;
  }
  
  const chatTitle = currentUserInteractingRole === 'realtor' 
    ? `Conversa (Cliente ${activeChatSession.clientId || 'ID Desconhecido'})` 
    : 'Atendimento UpLiving';

  return (
    // AnimatePresence já está no App.jsx, o widget será animado por ela se a key mudar ou se for condicionalmente renderizado
    // Mas para animar o próprio widget aparecendo/desaparecendo, precisamos do AnimatePresence aqui se `isChatWidgetOpen` o controla
    <AnimatePresence> 
      {isChatWidgetOpen && activeChatSession && ( // Dupla checagem, mas garante
        <motion.div
          key="chat-widget" // Key para AnimatePresence funcionar corretamente
          variants={widgetVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 right-0 mb-5 mr-5 sm:mr-7 md:mr-10 z-[150] w-[calc(100vw-2.5rem)] max-w-sm sm:max-w-md print:hidden"
        >
          <div className="bg-white rounded-xl shadow-2xl flex flex-col h-[80vh] max-h-[580px] sm:max-h-[620px] border border-slate-300/70 overflow-hidden">
            <header 
              className={`p-4 flex justify-between items-center rounded-t-xl shadow-sm
                          ${currentUserInteractingRole === 'realtor' ? 'bg-slate-700 text-white' : 'bg-upliving-primary text-white'}`}
            >
              <div className="flex items-center overflow-hidden">
                {currentUserInteractingRole === 'realtor' ? (
                  <UserCircleIconSolid className="w-7 h-7 mr-2.5 flex-shrink-0 opacity-90"/>
                ) : (
                  <ChatBubbleLeftEllipsisIcon className="w-7 h-7 mr-2.5 flex-shrink-0 opacity-90"/> // Ícone de chat para cliente
                )}
                <div className="overflow-hidden">
                  <h3 className="font-semibold text-md truncate">{chatTitle}</h3>
                  <p className="text-xs opacity-80 truncate" title={activeChatSession.apartment.name}>
                    Imóvel: {activeChatSession.apartment.name}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeChatWidget}
                className={`p-1.5 rounded-full transition-colors 
                            ${currentUserInteractingRole === 'realtor' ? 'hover:bg-slate-600' : 'hover:bg-upliving-primary-dark'}`}
                title="Fechar chat"
              >
                <XMarkIcon className="w-6 h-6" />
              </motion.button>
            </header>

            <div className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
              <AnimatePresence initial={false}>
                {currentMessages.map((msg) => {
                  const isCurrentUserMsg = msg.sender === currentUserInteractingRole || 
                                           (msg.sender === 'Cliente' && currentUserInteractingRole === 'client') ||
                                           (msg.sender === 'Corretor' && currentUserInteractingRole === 'realtor');
                  return (
                    <motion.div
                      key={msg.id}
                      layout
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className={`flex ${isCurrentUserMsg ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex items-end max-w-[85%] gap-2">
                        {!isCurrentUserMsg && msg.sender !== 'Sistema' && ( // Não mostrar avatar para sistema
                           <div className="flex-shrink-0 w-7 h-7 mb-1 self-end">
                             {msg.sender === 'Corretor' ? 
                                <BuildingOfficeIconSolid className="w-full h-full text-slate-400 bg-slate-200 rounded-full p-1" /> :
                                <UserCircleIconOutline className="w-full h-full text-slate-400 bg-slate-200 rounded-full p-0.5" />
                             }
                           </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl shadow-md break-words
                                      ${isCurrentUserMsg
                                        ? (currentUserInteractingRole === 'client' 
                                            ? 'bg-upliving-primary text-white rounded-br-lg' 
                                            : 'bg-upliving-accent text-white rounded-br-lg')
                                        : (msg.sender === 'Corretor'
                                            ? 'bg-slate-200 text-slate-800 rounded-bl-lg' 
                                            : 'bg-white text-slate-800 rounded-bl-lg border border-slate-200') 
                                      }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <p className={`text-xs mt-1.5 opacity-70
                                        ${isCurrentUserMsg ? 'text-right' : 'text-left'}`}>
                            {new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date(msg.timestamp))}
                          </p>
                        </div>
                         {isCurrentUserMsg && (
                           <div className="flex-shrink-0 w-7 h-7 mb-1 self-end">
                             <UserCircleIconSolid className="w-full h-full text-white rounded-full p-0.5" 
                                                style={{backgroundColor: currentUserInteractingRole === 'client' ? 'var(--tw-color-upliving-primary)' : 'var(--tw-color-upliving-accent)'}}/>
                           </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <footer className="p-3 sm:p-4 border-t border-slate-200 bg-white rounded-b-xl">
              <motion.form 
                initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.1 }}
                onSubmit={handleSendMessage} className="flex items-center space-x-2 sm:space-x-3"
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escreva sua mensagem..."
                  className="flex-grow px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-transparent text-sm transition-shadow hover:shadow-sm"
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className={`p-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                              ${currentUserInteractingRole === 'realtor' 
                                ? 'bg-slate-700 hover:bg-slate-600 text-white focus:ring-slate-500' 
                                : 'bg-upliving-primary hover:bg-upliving-primary-dark text-white focus:ring-upliving-primary'}`}
                  disabled={!newMessage.trim()}
                  title="Enviar mensagem"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </motion.button>
              </motion.form>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWidget;