import { Clock, RefreshCw, CheckCircle2, Edit2, Trash2 } from 'lucide-react';

export default function ActivityCard({ activity, onEdit, onDelete, onUpdateStatus }) {

    const statusConfig = {
        'pendente': {
            border: 'border-l-4 border-l-amber-400',
            bg: 'bg-white',
            badge: 'bg-amber-100 text-amber-800',
            icon: <Clock size={14} className="mr-1" />
        },
        'em andamento': {
            border: 'border-l-4 border-l-blue-500',
            bg: 'bg-white',
            badge: 'bg-blue-100 text-blue-800',
            icon: <RefreshCw size={14} className="mr-1" />
        },
        'concluído': {
            border: 'border-l-4 border-l-emerald-500',
            bg: 'bg-white',
            badge: 'bg-emerald-100 text-emerald-800',
            icon: <CheckCircle2 size={14} className="mr-1" />
        }
    };

    const config = statusConfig[activity.status];
    const statusOptions = ['pendente', 'em andamento', 'concluído'];

    return (
        <div className={`group relative p-4 mb-3 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 ${config.bg} ${config.border} animate-fade-in`}>

            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-800 text-lg leading-tight">
                    {activity.titulo}
                </h3>
                <span className={`flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${config.badge}`}>
                    {config.icon}
                    {activity.status.toUpperCase()}
                </span>
            </div>

            <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {activity.descricao}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2 gap-2 flex-wrap">
                <div className="text-xs text-slate-400 font-mono">
                    ID: #{activity.id}
                </div>

                <div className="flex gap-2 items-center">
                    <select
                        value={activity.status}
                        onChange={(e) => onUpdateStatus(activity.id, e.target.value)}
                        className="text-xs bg-slate-50 border border-slate-200 text-slate-600 rounded px-2 py-1 focus:outline-none focus:border-blue-400 hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                        {statusOptions.map(option => (
                            <option key={option} value={option}>
                                Mover para {option}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-1 pl-2 border-l border-slate-200">
                        <button
                            onClick={() => onEdit(activity)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex-shrink-0"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(activity.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
