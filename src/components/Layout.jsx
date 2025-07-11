// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />

      {/* Botão flutuante WhatsApp */}
      <a
        href="https://wa.me/5511988102130"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.52 3.478a11.84 11.84 0 00-16.78 0 11.84 11.84 0 000 16.78l-1.4 4.95 4.95-1.4a11.84 11.84 0 0016.78-16.78zm-8.52 16c-2.596 0-5.03-.803-7.11-2.27l-.5-.33-2.96.84.84-2.96-.33-.5a9.807 9.807 0 01-2.27-7.11c0-5.41 4.39-9.8 9.8-9.8s9.8 4.39 9.8 9.8-4.39 9.8-9.8 9.8zm5.33-7.47c-.29-.15-1.72-.85-1.98-.95s-.46-.15-.65.15-.75.95-.92 1.15-.34.22-.63.07a8.08 8.08 0 01-2.38-1.47 9.47 9.47 0 01-1.74-2.15c-.18-.29 0-.45.13-.6.07-.07.18-.18.27-.27.09-.09.12-.15.18-.25.06-.1.02-.19-.01-.27s-.65-1.56-.9-2.15c-.23-.56-.47-.48-.65-.48H6.76c-.17 0-.45.06-.7.32s-.92.9-.92 2.2  .94 2.55 1.07 2.73 1.84 2.8 4.45 3.93c.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.07 1.72-.7 1.96-1.38s.24-1.28.17-1.38-.31-.21-.62-.36z"/>
        </svg>
      </a>
    </div>
  );
}
