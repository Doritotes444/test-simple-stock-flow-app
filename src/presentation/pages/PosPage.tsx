import React, { useState } from 'react';
import { Product } from '../../domain/types/product.types';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../../application/hooks/useCart';

interface PosPageProps {
    products: Product[];
    userId: number;
    onSaleSuccess: () => void;
}

export const PosPage: React.FC<PosPageProps> = ({ products, userId, onSaleSuccess }) => {
    const { cart, addToCart, removeFromCart, total, checkout, submitting, error } = useCart(userId);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleCheckout = async () => {
        const result = await checkout();
        if (result) {
            setSuccessMessage(`¡Venta #${result.id} registrada con éxito por $${result.total.toLocaleString()} ${result.currency}!`);
            onSaleSuccess();
            setTimeout(() => setSuccessMessage(null), 5000);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Punto de Venta (POS)</h1>
                    <p className="text-slate-400 text-sm">Selecciona productos para registrar una venta en tiempo real</p>
                </div>

                {successMessage && (
                    <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 text-sm p-4 rounded-xl font-semibold">
                        {successMessage}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))}
                </div>
            </div>

            {/* Panel Lateral de Venta / Carrito */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit sticky top-6 shadow-xl">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                    <span>Resumen de Venta</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full">
                        {cart.length} items
                    </span>
                </h2>

                {error && (
                    <div className="bg-red-950 border border-red-800 text-red-300 text-xs p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {cart.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-sm">
                        El carrito está vacío. Agrega productos del catálogo.
                    </div>
                ) : (
                    <div className="space-y-3 divide-y divide-slate-800">
                        {cart.map((item) => (
                            <div key={item.product.id} className="pt-3 flex justify-between items-center">
                                <div>
                                    <div className="font-semibold text-white text-sm">{item.product.name}</div>
                                    <div className="text-xs text-slate-400">
                                        {item.quantity} x ${item.product.price.toLocaleString()}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="font-bold text-white text-sm">
                                        ${(item.quantity * item.product.price).toLocaleString()}
                                    </span>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="text-red-400 hover:text-red-300 text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="pt-4 mt-4">
                            <div className="flex justify-between items-baseline mb-6">
                                <span className="text-slate-400 text-sm font-semibold">Total a Cobrar:</span>
                                <span className="text-2xl font-black text-emerald-400">
                                    ${total.toLocaleString()} COP
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={submitting || cart.length === 0}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-950 disabled:opacity-50"
                            >
                                {submitting ? 'Procesando Venta...' : 'Completar Venta'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
