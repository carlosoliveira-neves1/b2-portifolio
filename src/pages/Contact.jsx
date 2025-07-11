import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Enviar formulário:', form);
    // TODO: integrar com serviço de email ou API
  };

  return (
    <section id="contato" className="max-w-xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4 text-center">Contato</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Sua mensagem"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-2 rounded h-32"
          required
        />
        <button type="submit" className="w-full py-2 rounded bg-orange-500 text-white font-semibold">Enviar</button>
      </form>
    </section>
  );
}