import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    // x: "-100vw", // Efeito de slide da esquerda
    // scale: 0.8,
    y: 15, // Leve slide de baixo para cima
  },
  in: {
    opacity: 1,
    // x: 0,
    // scale: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    // x: "100vw", // Efeito de slide para a direita
    // scale: 1.2,
    y: -15, // Leve slide para cima ao sair
  }
};

const pageTransition = {
  type: "tween", 
  ease: "anticipate", // Um ease suave
  duration: 0.5
};

const AnimatedPage = ({ children, className }) => { // Adicionado className para flexibilidade
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={`w-full ${className || ''}`} // Aplica className se passado
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;