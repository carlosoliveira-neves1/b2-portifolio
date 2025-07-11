import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Better Assesoria LTDA. Todos os direitos reservados.
      </div>
    </footer>
  );
}