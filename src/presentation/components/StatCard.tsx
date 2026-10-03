import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon }) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</span>
                {icon && <span className="text-xl">{icon}</span>}
            </div>
            <div className="mt-2 flex items-baseline">
                <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
            </div>
            {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
    );
};
