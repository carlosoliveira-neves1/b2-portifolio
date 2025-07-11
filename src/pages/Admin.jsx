import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: '',
    description: '',
    status: 'Realizada',
    images: []
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();

  // Carrega projetos do IndexedDB ao montar
  useEffect(() => {
    localforage.getItem('projects').then(stored => {
      setProjects(stored || []);
    });
  }, []);

  // Gera previews ao selecionar arquivos
  useEffect(() => {
    if (files.length) {
      const prs = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          prs.push(reader.result);
          if (prs.length === files.length) {
            setPreviews(prs);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setPreviews([]);
    }
  }, [files]);

  const resetForm = () => {
    setForm({ id: null, title: '', description: '', status: 'Realizada', images: [] });
    setFiles([]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const save = imgs => {
      localforage.getItem('projects').then(stored => {
        const base = stored || [];
        let updated;
        if (form.id) {
          // edição
          updated = base.map(p =>
            p.id === form.id
              ? { ...p, ...form, images: imgs }
              : p
          );
        } else {
          // novo
          updated = [
            ...base,
            { ...form, id: Date.now(), images: imgs }
          ];
        }
        localforage.setItem('projects', updated).then(() => {
          setProjects(updated);
          resetForm();
          alert('Projeto salvo!');
          navigate('/portfolio');
        });
      });
    };

    if (files.length) {
      const prs = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          prs.push(reader.result);
          if (prs.length === files.length) {
            save(prs);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      save(form.images);
    }
  };

  const handleEdit = p => {
    setForm(p);
    setPreviews(p.images || []);
    setFiles([]);
  };

  const handleDelete = id => {
    if (!window.confirm('Excluir projeto?')) return;
    localforage.getItem('projects').then(stored => {
      const updated = (stored || []).filter(p => p.id !== id);
      localforage.setItem('projects', updated).then(() => {
        setProjects(updated);
      });
    });
  };

  return (
    <section className="pt-20">
      <h2 className="text-2xl font-semibold mb-4">
        {form.id ? 'Editar Projeto' : 'Adicionar Projeto'}
      </h2>

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
          multiple
          onChange={e => setFiles(Array.from(e.target.files))}
          className="w-full"
        />

        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Preview ${i + 1}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        )}

        <div className="flex space-x-2">
          <button
            type="submit"
            className="py-2 px-4 bg-orange-500 text-white rounded"
          >
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

      <h3 className="text-xl font-semibold mb-4">Projetos Cadastrados</h3>
      <div className="space-y-4">
        {projects.map(p => (
          <div
            key={p.id}
            className="flex items-center space-x-4 border p-4 rounded"
          >
            <div className="flex-shrink-0 grid grid-cols-3 gap-1">
              {(p.images || []).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${p.title} ${i + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold">{p.title}</h4>
              <p className="text-sm text-gray-600">{p.status}</p>
            </div>
            <button
              onClick={() => handleEdit(p)}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(p.id)}
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
