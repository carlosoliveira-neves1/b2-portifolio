// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Realizada');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert('Selecione uma imagem.');
    const reader = new FileReader();
    reader.onload = () => {
      const stored = JSON.parse(localStorage.getItem('projects')) || [];
      const newProj = {
        id: Date.now(),
        title,
        description,
        status,
        image: reader.result,
      };
      localStorage.setItem('projects', JSON.stringify([...stored, newProj]));
      setTitle('');
      setDescription('');
      setStatus('Realizada');
      setFile(null);
      alert('Projeto adicionado!');
    };
    reader.readAsDataURL(file);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Administração de Projetos</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Título do Projeto"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border p-2 rounded h-24"
          required
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option>Realizada</option>
          <option>Em Andamento</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
          className="w-full"
          required
        />
        <button type="submit" className="py-2 px-4 bg-orange-500 text-white rounded">
          Adicionar Projeto
        </button>
      </form>
    </section>
  );
}
