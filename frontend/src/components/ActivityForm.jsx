import { useState, useEffect } from 'react';

export default function ActivityForm({ onSubmit, editingActivity, onCancel }) {
    const [formData, setFormData] = useState({ titulo: '', descricao: '', status: 'pendente' });

    useEffect(() => {
        if (editingActivity) {
            setFormData({
                titulo: editingActivity.titulo,
                descricao: editingActivity.descricao,
                status: editingActivity.status
            });
        } else {
            setFormData({ titulo: '', descricao: '', status: 'pendente' });
        }
    }, [editingActivity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ titulo: '', descricao: '', status: 'pendente' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{editingActivity ? 'Editar' : 'Nova Atividade'}</h2>
            <input
                type="text"
                name="titulo"
                placeholder="Título da atividade"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
                required
            />
            <textarea
                name="descricao"
                placeholder="Descrição"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
                {editingActivity && <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-600">Cancelar</button>}
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    {editingActivity ? 'Salvar' : 'Adicionar'}
                </button>
            </div>
        </form>
    );
}
