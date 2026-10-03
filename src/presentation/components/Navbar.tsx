import React from 'react';
import { User } from '../../domain/types/auth.types';

interface NavbarProps {
    user: User | null;
    currentTab: string;
    onSelectTab: (tab: string) => void;
    onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, currentTab, onSelectTab, onLogout }) => {
    return (
        <header className="bg-slate-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-emerald-500 text-slate-950 font-black p-2 rounded-lg text-lg">
                        SSF
                    </div>
                    <div>
                        <span className="text-xl font-bold tracking-tight">Simple Stock Flow</span>
                        <span className="ml-2 text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-mono">
                            Onion 4L
                        </span>
                    </div>
                </div>

                {user && (
                    <nav className="flex space-x-1 sm:space-x-4">
                        <button
                            onClick={() => onSelectTab('catalog')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                                currentTab === 'catalog'
                                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            📦 Inventario
                        </button>
                        <button
                            onClick={() => onSelectTab('pos')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                                currentTab === 'pos'
                                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            🛒 Punto de Venta
                        </button>
                        <button
                            onClick={() => onSelectTab('reports')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                                currentTab === 'reports'
                                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            📊 Reportes
                        </button>
                    </nav>
                )}

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold">{user.name}</p>
                                <p className="text-xs text-slate-400">{user.role}</p>
                            </div>
                            <button
                                onClick={onLogout}
                                className="bg-red-600/20 text-red-400 border border-red-800 hover:bg-red-600 hover:text-white text-xs px-3 py-1.5 rounded transition"
                            >
                                Salir
                            </button>
                        </div>
                    ) : (
                        <span className="text-xs text-slate-400">SENA Neiva ADSO</span>
                    )}
                </div>
            </div>
        </header>
    );
};
