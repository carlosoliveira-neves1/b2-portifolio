// src/components/Portfolio.jsx
import React, { useState, useEffect } from 'react';

// Se quiser manter alguns projetos iniciais, senão basta deixar array vazio
const defaultProjects = [
  {
    id: 1,
    title: 'Reforma Residencial Vila Mariana',
    image: '/images/vila-mariana.jpg',
    status: 'Realizada',
    description: 'Reforma completa de cozinha, banheiro e área de serviço.',
  },
  {
    id: 2,
    title: 'Construção Prédio Comercial Centro',
    image: '/images/predio-centro.jpg',
    status: 'Em Andamento',
    description: 'Estrutura metálica e alvenaria concluída, interiores em execução.',
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('Todos');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Sempre buscar do localStorage ao montar
    const stored = JSON.parse(localStorage.getItem('projects')) || [];
    if (stored.length > 0) {
      setProjects(stored);
    } else {
      // fallback opcional
      setProjects(defaultProjects);
    }
  }, []);

  const filtered = projects.filter(
    p => filter === 'Todos' || p.status === filter
  );

  return (
    <section id="portfolio">
      <div className="flex justify-center mb-6 space-x-4">
        {['Todos', 'Realizada', 'Em Andamento'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${filter === f ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          >
            {f}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum projeto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <span className="inline-block px-2 py-1 text-sm rounded-full bg-orange-100 text-orange-700 mb-2">{p.status}</span>
                <p className="text-gray-600 text-sm">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
