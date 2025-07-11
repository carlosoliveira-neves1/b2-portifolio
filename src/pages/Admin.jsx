// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [projects, setProjects] = useState([]);
  // estado do formulário com edit flag
  const [form, setForm] = useState({
    id: null,
    title: '',
    description: '',
    status: 'Realizada',
    image: null
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(stored);
  }, []);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const resetForm = () => {
    setForm({ id: null, title: '', description: '', status: 'Realizada', image: null });
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || (!file && !form.image)) {
      return alert('Preencha todos os campos e selecione imagem.');
    }
    const saveProject = base64Image => {
      const stored = JSON.parse(localStorage.getItem('projects')) || [];
      let updated;
      if (form.id) {
        // edição
        updated = stored.map(p =>
          p.id === form.id
            ? { ...p, title: form.title, description: form.description, status: form.status, image: base64Image }
            : p
        );
      } else {
        // novo
        const newProj = {
          id: Date.now(),
          title: form.title,
          description: form.description,
          status: form.status,
          image: base64Image
        };
        updated = [...stored, newProj];
      }
      localStorage.setItem('projects', JSON.stringify(updated));
      setProjects(updated);
      resetForm();
      alert('Projeto salvo!');
+     // força recarregar o Portfolio
+     navigate('/portfolio');
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => saveProject(reader.result);
      reader.readAsDataURL(file);
    } else {
      saveProject(form.image);
    }
  };

  const handleEdit = proj => {
    setForm({
      id: proj.id,
      title: proj.title,
      description: proj.description,
      status: proj.status,
      image: proj.image
    });
    setPreview(proj.image);
    setFile(null);
  };

  const handleDelete = id => {
    if (!window.confirm('Deseja realmente excluir este projeto?')) return;
    const stored = JSON.parse(localStorage.getItem('projects')) || [];
    const updated = stored.filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(updated));
    setProjects(updated);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        {form.id ? 'Editar Projeto' : 'Adicionar Projeto'}
      </h2>

      {/* Formulário de inclusão/edição */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mb-8">
        <input
          type="text"
          placeholder="Título do Projeto"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Descrição"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded h-24"
          required
        />
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
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
          required={!form.id}
        />
        {preview && (
          <div>
            <label className="block mb-1">Preview:</label>
            <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />
          </div>
        )}
        <div className="flex space-x-2">
          <button type="submit" className="py-2 px-4 bg-orange-500 text-white rounded">
            {form.id ? 'Atualizar' : 'Adicionar'}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={resetForm}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Listagem de projetos */}
      <h3 className="text-xl font-semibold mb-4">Projetos Cadastrados</h3>
      <div className="space-y-4">
        {projects.map(proj => (
          <div key={proj.id} className="flex items-center space-x-4 border p-4 rounded">
            <img
              src={proj.image}
              alt={proj.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-grow">
              <h4 className="font-semibold">{proj.title}</h4>
              <p className="text-sm text-gray-600">{proj.status}</p>
            </div>
            <button
              onClick={() => handleEdit(proj)}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(proj.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
