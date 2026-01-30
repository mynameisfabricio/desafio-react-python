import { Clock, Loader2, CheckCircle2 } from 'lucide-react';
import ActivityCard from './ActivityCard';

export default function ActivityList({ activities, onEdit, onDelete, onUpdateStatus }) {

    const groupedActivities = {
        'pendente': activities.filter(a => a.status === 'pendente'),
        'em andamento': activities.filter(a => a.status === 'em andamento'),
        'concluído': activities.filter(a => a.status === 'concluído')
    };

    const statusConfig = {
        'pendente': {
            title: 'A Fazer',
            icon: <Clock size={16} className="text-amber-500" />,
            headerBg: 'bg-amber-50',
            headerBorder: 'border-amber-200',
            countColor: 'text-amber-600 bg-amber-100'
        },
        'em andamento': {
            title: 'Em Progresso',
            icon: <Loader2 size={16} className="text-blue-500 animate-spin-slow" />,
            headerBg: 'bg-blue-50',
            headerBorder: 'border-blue-200',
            countColor: 'text-blue-600 bg-blue-100'
        },
        'concluído': {
            title: 'Concluído',
            icon: <CheckCircle2 size={16} className="text-emerald-500" />,
            headerBg: 'bg-emerald-50',
            headerBorder: 'border-emerald-200',
            countColor: 'text-emerald-600 bg-emerald-100'
        }
    };

    const statuses = ['pendente', 'em andamento', 'concluído'];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statuses.map(status => (
                <div key={status} className="flex flex-col h-full">
                    <div className={`flex items-center justify-between p-3 rounded-t-lg border-b-0 border ${statusConfig[status].headerBg} ${statusConfig[status].headerBorder}`}>
                        <div className="flex items-center gap-2 font-semibold text-slate-700">
                            {statusConfig[status].icon}
                            {statusConfig[status].title}
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusConfig[status].countColor}`}>
                            {groupedActivities[status].length}
                        </span>
                    </div>

                    <div className="bg-slate-50/50 p-3 rounded-b-lg border border-t-0 border-slate-200 flex-1 min-h-[200px]">
                        {groupedActivities[status].length === 0 ? (
                            <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg h-full flex items-center justify-center">
                                Vazio
                            </div>
                        ) : (
                            groupedActivities[status].map(activity => (
                                <ActivityCard
                                    key={activity.id}
                                    activity={activity}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onUpdateStatus={onUpdateStatus}
                                />
                            ))
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
