import React, { useState, useEffect } from 'react';
import { reportApi } from '../../infrastructure/api/reportApi';
import { SalesReport } from '../../domain/types/report.types';
import { StatCard } from '../components/StatCard';

export const ReportsPage: React.FC = () => {
    const [report, setReport] = useState<SalesReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await reportApi.getSalesReport();
                setReport(data);
            } catch (err: any) {
                setError(err.message || 'Error al cargar el reporte');
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Reporte de Ventas e Ingresos</h1>
                <p className="text-slate-400 text-sm">Resumen financiero y transacciones históricas inmutables</p>
            </div>

            {error && (
                <div className="bg-red-950 border border-red-800 text-red-300 text-xs p-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    title="Total Transacciones"
                    value={report?.total_transactions ?? 0}
                    icon="🧾"
                />
                <StatCard
                    title="Ingresos Totales (COP)"
                    value={`$${(report?.total_revenue ?? 0).toLocaleString()}`}
                    icon="💰"
                />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-950">
                    <h2 className="font-bold text-white text-sm">Historial de Ventas Registradas</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">ID Venta</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                        Cargando transacciones...
                                    </td>
                                </tr>
                            ) : !report || report.sales.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                        No hay transacciones registradas en el período.
                                    </td>
                                </tr>
                            ) : (
                                report.sales.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-slate-800/50 transition">
                                        <td className="px-6 py-4 font-mono text-emerald-400 font-bold">#{sale.id}</td>
                                        <td className="px-6 py-4 text-xs text-slate-400">{sale.createdAt}</td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                {sale.items.map((item, idx) => (
                                                    <div key={idx} className="text-xs text-slate-300">
                                                        {item.quantity}x {item.productName} (${item.subtotal.toLocaleString()})
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-white">
                                            ${sale.total.toLocaleString()} {sale.currency}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
