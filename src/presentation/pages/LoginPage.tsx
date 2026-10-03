import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: (credentials: { email: string; password: string }) => Promise<boolean>;
    loading: boolean;
    error: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, loading, error }) => {
    const [email, setEmail] = useState('cajero@stockflow.com');
    const [password, setPassword] = useState('password123');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onLogin({ email, password });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-block bg-emerald-500 text-slate-950 font-black p-3 rounded-xl text-2xl mb-3">
                        SSF
                    </div>
                    <h2 className="text-2xl font-bold text-white">Simple Stock Flow</h2>
                    <p className="text-slate-400 text-sm mt-1">Ingreso al Sistema de Control de Stock</p>
                </div>

                {error && (
                    <div className="bg-red-950/80 border border-red-800 text-red-300 text-xs p-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                            placeholder="usuario@sena.edu.co"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg text-sm transition shadow-lg shadow-emerald-950 disabled:opacity-50 mt-4"
                    >
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-500">
                    Arquitectura Onion 4 Capas · SENA ADSO
                </div>
            </div>
        </div>
    );
};
