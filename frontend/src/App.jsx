import { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import ConfirmDialog from './components/ConfirmDialog';
import './index.css';

const API_URL = 'http://localhost:8000';

function App() {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, activityId: null });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/activities`);
      if (!response.ok) throw new Error('Erro ao carregar atividades');
      const data = await response.json();
      setActivities(data);
      setError(null);
    } catch (err) {
      setError('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingActivity) {
        const response = await fetch(`${API_URL}/activities/${editingActivity.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Erro ao atualizar atividade');
        setEditingActivity(null);
      } else {
        const response = await fetch(`${API_URL}/activities`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Erro ao criar atividade');
      }
      fetchActivities();
    } catch (err) {
      alert('Erro ao salvar atividade: ' + err.message);
    }
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, activityId: id });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/activities/${confirmDialog.activityId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao excluir atividade');
      fetchActivities();
      setConfirmDialog({ isOpen: false, activityId: null });
    } catch (err) {
      alert('Erro ao excluir atividade: ' + err.message);
      setConfirmDialog({ isOpen: false, activityId: null });
    }
  };

  const cancelDelete = () => {
    setConfirmDialog({ isOpen: false, activityId: null });
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/activities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('Erro ao atualizar status');
      fetchActivities();
    } catch (err) {
      alert('Erro ao atualizar status: ' + err.message);
    }
  };

  const handleCancel = () => {
    setEditingActivity(null);
  };

  const stats = {
    total: activities.length,
    pendente: activities.filter(a => a.status === 'pendente').length,
    emAndamento: activities.filter(a => a.status === 'em andamento').length,
    concluido: activities.filter(a => a.status === 'concluído').length
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <div className="max-w-5xl mx-auto px-4 py-8">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">
            Gerenciador de Atividades
          </h1>
          <p className="text-slate-500 text-sm">
            Organize suas tarefas de forma eficiente
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
            <span className="block text-2xl font-bold text-slate-800">{stats.total}</span>
            <span className="text-xs text-slate-400 font-medium uppercase">Total</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-l-4 border-l-amber-400 border-slate-200 text-center">
            <span className="block text-2xl font-bold text-amber-600">{stats.pendente}</span>
            <span className="text-xs text-slate-400 font-medium uppercase">Pendentes</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-l-4 border-l-blue-500 border-slate-200 text-center">
            <span className="block text-2xl font-bold text-blue-600">{stats.emAndamento}</span>
            <span className="text-xs text-slate-400 font-medium uppercase">Em Andamento</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-l-4 border-l-emerald-500 border-slate-200 text-center">
            <span className="block text-2xl font-bold text-emerald-600">{stats.concluido}</span>
            <span className="text-xs text-slate-400 font-medium uppercase">Concluídas</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            {editingActivity ? 'Editar Atividade' : 'Nova Atividade'}
          </h2>
          <ActivityForm
            onSubmit={handleSubmit}
            editingActivity={editingActivity}
            onCancel={handleCancel}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-slate-500 text-sm">Carregando atividades...</p>
          </div>
        ) : (
          <ActivityList
            activities={activities}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Tem certeza que deseja excluir esta atividade?"
      />
    </div>
  );
}

export default App;
