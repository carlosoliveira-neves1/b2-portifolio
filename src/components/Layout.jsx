// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      {/* Ajuste de padding-top para não ficar sob o header fixo */}
      <main className="flex-grow container mx-auto px-4 pt-20 md:pt-8 pb-8">
        <Outlet />
      </main>
      <Footer />

      {/* Botão flutuante WhatsApp */}
      <a
        href="https://wa.me/5511988102130"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition border-2 border-green-500"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="h-6 w-6"
        />
      </a>
    </div>
  );
}
