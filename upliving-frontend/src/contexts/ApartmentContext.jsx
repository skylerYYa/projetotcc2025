// Conteúdo fornecido na minha resposta anterior (Passo de correção do ERR_NAME_NOT_RESOLVED)
// Certifique-se de que ele importa `mockApartments` e o usa no `useState`.
// Vou colar novamente por segurança:
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { mockApartments } from '../data/mockApartments'; // IMPORTA OS MOCKS

const ApartmentContext = createContext();

export const ApartmentProvider = ({ children }) => {
  const [apartments, setApartments] = useState(mockApartments); // USA OS MOCKS

  const addApartment = (newApartmentData) => {
    const newApartmentWithId = {
        ...newApartmentData,
        id: newApartmentData.id || `apt${Date.now()}_${Math.random().toString(16).slice(2)}`,
        timestamp: new Date(),
    };
    setApartments(prevApartments => [newApartmentWithId, ...prevApartments]);
  };

  const updateApartment = (updatedApartment) => {
    setApartments(prevApartments =>
      prevApartments.map(apt =>
        apt.id === updatedApartment.id ? { ...apt, ...updatedApartment, lastModified: new Date() } : apt
      )
    );
  };

  const toggleApartmentStatus = (apartmentId) => {
    setApartments(prev => 
      prev.map(ap => 
        ap.id === apartmentId ? { ...ap, active: !ap.active, lastModified: new Date() } : ap
      )
    );
  };
 
  const deleteApartment = (apartmentId) => {
    setApartments(prevApartments =>
      prevApartments.filter(apt => apt.id !== apartmentId)
    );
  };

  return (
    <ApartmentContext.Provider value={{ 
        apartments, 
        addApartment, 
        updateApartment, 
        toggleApartmentStatus,
        deleteApartment
    }}>
      {children}
    </ApartmentContext.Provider>
  );
};

export const useApartments = () => {
  const context = useContext(ApartmentContext);
  if (context === undefined) {
    throw new Error('useApartments must be used within an ApartmentProvider');
  }
  return context;
};