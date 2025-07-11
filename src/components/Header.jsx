// Header.jsx: atualize o título e inclua link para Administração
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const linkClass = ({ isActive }) =>
    `hover:text-orange-500 ${isActive ? 'text-orange-500 font-semibold' : ''}`;

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-orange-500">
          B2 Engenharia e Construção
        </NavLink>
        <ul className="flex space-x-6">
          <li><NavLink to="/" className={linkClass}>Início</NavLink></li>
          <li><NavLink to="/portfolio" className={linkClass}>Portfólio</NavLink></li>
          <li><NavLink to="/contato" className={linkClass}>Contato</NavLink></li>
          <li><NavLink to="/administracao" className={linkClass}>Administração</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}