import React, { useState } from 'react';
import { Product } from '../../domain/types/product.types';
import { StatCard } from '../components/StatCard';

interface CatalogPageProps {
    products: Product[];
    loading: boolean;
    error: string | null;
    onCreateProduct: (payload: any) => Promise<boolean>;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ products, loading, error, onCreateProduct }) => {
    const [showModal, setShowModal] = useState(false);
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(1);

    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    const lowStockCount = products.filter((p) => p.stock < 5).length;

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await onCreateProduct({
            sku,
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            category_id: Number(categoryId),
        });

        if (success) {
            setShowModal(false);
            setSku('');
            setName('');
            setDescription('');
            setPrice(0);
            setStock(0);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Inventario y Catálogo</h1>
                    <p className="text-slate-400 text-sm">Control de productos y existencias</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-2 rounded-lg transition"
                >
                    + Nuevo Producto
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title="Total Productos" value={products.length} icon="📦" />
                <StatCard title="Unidades en Stock" value={totalStock} icon="📊" />
                <StatCard
                    title="Stock Crítico (< 5)"
                    value={lowStockCount}
                    icon="⚠️"
                    subtitle={lowStockCount > 0 ? 'Requiere reabastecimiento' : 'Niveles óptimos'}
                />
            </div>

            {error && (
                <div className="bg-red-950 border border-red-800 text-red-300 text-xs p-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">SKU</th>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">Precio</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        Cargando inventario...
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        No hay productos registrados en el inventario.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-800/50 transition">
                                        <td className="px-6 py-4 font-mono text-emerald-400 font-semibold">{product.sku}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-white">{product.name}</div>
                                            <div className="text-xs text-slate-400">{product.description}</div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-white">
                                            ${product.price.toLocaleString()} {product.currency}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    product.stock === 0
                                                        ? 'bg-red-950 text-red-400'
                                                        : product.stock < 5
                                                        ? 'bg-amber-950 text-amber-400'
                                                        : 'bg-emerald-950 text-emerald-400'
                                                }`}
                                            >
                                                {product.stock} un.
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-emerald-400 font-semibold">● Activo</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Crear Producto */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-white">Registrar Nuevo Producto</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1">SKU</label>
                                    <input
                                        required
                                        value={sku}
                                        onChange={(e) => setSku(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                                        placeholder="PROD-001"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1">Nombre</label>
                                    <input
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                                        placeholder="Arroz 1kg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Descripción</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                                    rows={2}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1">Precio (COP)</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1">Stock Inicial</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={stock}
                                        onChange={(e) => setStock(Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg"
                                >
                                    Guardar Producto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
