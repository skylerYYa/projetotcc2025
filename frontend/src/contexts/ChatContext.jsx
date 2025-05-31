// Use o conteúdo completo da minha penúltima resposta (Passo 12 - Ajuste de auto-resposta do chat)
// É um arquivo longo, então vou resumir a estrutura para você conferir:
import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';

const CHAT_LEADS_STORAGE_KEY = 'uplivingChatLeads';
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // ... (todos os useState, useEffects para localStorage e storage event, useRef) ...
  // ... (openChatForClient, openChatForRealtor, closeChatWidget, addMessageToActiveSession, sendChatMessage) ...
  // CERTIFIQUE-SE DE COPIAR O CONTEÚDO COMPLETO DA RESPOSTA ANTERIOR (Passo 12, onde corrigimos a auto-resposta)
  // Vou colar aqui o conteúdo completo da última versão funcional que tínhamos.

  const [activeChatSession, setActiveChatSession] = useState(null);
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);
  const [chatLeads, setChatLeads] = useState(() => {
    try {
      const storedLeads = localStorage.getItem(CHAT_LEADS_STORAGE_KEY);
      return storedLeads ? JSON.parse(storedLeads) : [];
    } catch (error) {
      console.error("Erro ao carregar leads do localStorage:", error);
      return [];
    }
  });
  const [currentUserInteractingRole, setCurrentUserInteractingRole] = useState('client');

  const activeChatSessionRef = useRef(activeChatSession);
  useEffect(() => {
    activeChatSessionRef.current = activeChatSession;
  }, [activeChatSession]);

  useEffect(() => {
    try {
      const currentStoredLeads = localStorage.getItem(CHAT_LEADS_STORAGE_KEY);
      if (JSON.stringify(chatLeads) !== currentStoredLeads) {
        localStorage.setItem(CHAT_LEADS_STORAGE_KEY, JSON.stringify(chatLeads));
      }
    } catch (error) {
      console.error("Erro ao salvar leads no localStorage:", error);
    }
  }, [chatLeads]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === CHAT_LEADS_STORAGE_KEY && event.newValue && event.oldValue !== event.newValue) {
        try {
          console.log('[ChatContext] Evento de storage detectado. Atualizando leads.');
          const newLeadsFromStorage = JSON.parse(event.newValue);
          setChatLeads(newLeadsFromStorage);

          const currentActiveSession = activeChatSessionRef.current;
          if (currentActiveSession) {
            const updatedSessionData = newLeadsFromStorage.find(lead => lead.id === currentActiveSession.id);
            if (updatedSessionData) {
              if (JSON.stringify(currentActiveSession.messages) !== JSON.stringify(updatedSessionData.messages) || 
                  currentActiveSession.lastActivity !== updatedSessionData.lastActivity) {
                 console.log(`[ChatContext] Sessão ativa ${currentActiveSession.id} atualizada via storage.`);
                setActiveChatSession({ ...updatedSessionData });
              }
            }
          }
        } catch (error) {
          console.error("Erro ao processar atualização de leads do storage:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const openChatForClient = useCallback((apartment, clientId = 'client123') => {
    setCurrentUserInteractingRole('client');
    setChatLeads(currentLeads => {
      const existingLeadIndex = currentLeads.findIndex(lead => lead.apartment.id === apartment.id && lead.clientId === clientId && !lead.isResolved);
      let sessionToActivate;
      let updatedLeads;

      if (existingLeadIndex !== -1) {
        const leadToUpdate = { ...currentLeads[existingLeadIndex], lastActivity: new Date()};
        sessionToActivate = leadToUpdate;
        updatedLeads = [...currentLeads];
        updatedLeads[existingLeadIndex] = leadToUpdate;
      } else {
        const sessionId = `chat_${Date.now()}_${apartment.id}_${clientId}`;
        const initialSystemMessage = {
          id: `msg_system_${Date.now()}`,
          sender: 'Corretor',
          text: `Olá! Bem-vindo ao chat sobre o imóvel "${apartment.name}". Em que posso ajudar?`,
          timestamp: new Date(),
        };
        sessionToActivate = {
          id: sessionId, apartment, clientId, messages: [initialSystemMessage],
          timestamp: new Date(), isResolved: false, lastActivity: new Date(), unreadByRealtor: true,
        };
        updatedLeads = [sessionToActivate, ...currentLeads];
        console.log(`INFO: Novo Lead gerado - Cliente ${clientId} interessado em: ${apartment.name} (ID: ${apartment.id})`);
      }
      setActiveChatSession(sessionToActivate);
      setIsChatWidgetOpen(true);
      return updatedLeads;
    });
  }, []);

  const openChatForRealtor = useCallback((leadId) => {
    setCurrentUserInteractingRole('realtor');
    setChatLeads(currentLeads => {
        const leadToOpen = currentLeads.find(lead => lead.id === leadId);
        if (leadToOpen) {
            const sessionForRealtor = { ...leadToOpen, unreadByRealtor: false };
            setActiveChatSession(sessionForRealtor);
            setIsChatWidgetOpen(true);
            return currentLeads.map(l => l.id === leadId ? {...l, unreadByRealtor: false } : l);
        }
        return currentLeads;
    });
  }, []);

  const closeChatWidget = useCallback(() => setIsChatWidgetOpen(false), []);

  const addMessageToActiveSession = useCallback((message) => {
    const currentActiveSessionForUpdate = activeChatSessionRef.current;
    if (!currentActiveSessionForUpdate) return;
    const currentSessionId = currentActiveSessionForUpdate.id;

    setActiveChatSession(prev => {
      if (!prev || prev.id !== currentSessionId) return prev;
      return { ...prev, messages: [...prev.messages, message], lastActivity: new Date() };
    });

    setChatLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.id === currentSessionId ? { 
              ...lead, messages: [...lead.messages, message], lastActivity: new Date(),
              unreadByRealtor: (message.sender === 'Cliente' && currentUserInteractingRole !== 'realtor') ? true : lead.unreadByRealtor,
            } : lead
      )
    );
  }, [currentUserInteractingRole]);

  const sendChatMessage = useCallback((text) => {
    const currentSession = activeChatSessionRef.current;
    if (!currentSession || !text.trim()) return;
    const sender = currentUserInteractingRole === 'realtor' ? 'Corretor' : 'Cliente';
    const newMessage = {
      id: `msg_${sender.toLowerCase()}_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      sender: sender, text: text.trim(), timestamp: new Date(),
    };

    let shouldSendAutoReply = false;
    if (sender === 'Cliente') {
      if (currentSession.messages && currentSession.messages.length === 1 && currentSession.messages[0].sender === 'Corretor') {
        shouldSendAutoReply = true;
      }
    }
    addMessageToActiveSession(newMessage);
    if (shouldSendAutoReply) {
      setTimeout(() => {
        const autoReply = {
          id: `msg_autoreply_${Date.now()}_${Math.random().toString(16).slice(2)}`,
          sender: 'Corretor',
          text: 'Sua mensagem foi recebida. Em breve um corretor dará continuidade.',
          timestamp: new Date(),
        };
        addMessageToActiveSession(autoReply);
      }, 1500);
    }
  }, [currentUserInteractingRole, addMessageToActiveSession]);

  return (
    <ChatContext.Provider value={{
      isChatWidgetOpen, activeChatSession, chatLeads, currentUserInteractingRole,
      openChatForClient, openChatForRealtor, closeChatWidget, sendChatMessage,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => { /* ... (como antes) ... */ 
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within an ChatProvider');
    }
    return context;
};