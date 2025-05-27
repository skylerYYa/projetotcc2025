import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingOffice2Icon } from '@heroicons/react/24/solid';

const Logo = ({ className = '', iconSize = 'h-8 w-8', textSize = 'text-2xl', color = 'text-upliving-primary' }) => {
  return (
    <Link to="/" className={`inline-flex items-center space-x-2 group ${className}`}>
      <BuildingOffice2Icon className={`${iconSize} ${color} group-hover:text-upliving-primary-dark transition-colors`} />
      <span className={`font-bold ${textSize} ${color} group-hover:text-upliving-primary-dark transition-colors`}>UpLiving</span>
    </Link>
  );
};

export default Logo;