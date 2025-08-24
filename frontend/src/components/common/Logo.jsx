import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = '', imgSize = 'h-48 w-48' }) => {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      
      <img src="/src/assets/logo.png" alt="Logo" className={`${imgSize} group-hover:opacity-80 transition-opacity`} />
    </Link>
  );
};

export default Logo;