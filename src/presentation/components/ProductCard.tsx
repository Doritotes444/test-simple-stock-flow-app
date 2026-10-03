import React from 'react';
import { Product } from '../../domain/types/product.types';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const isOutOfStock = product.stock <= 0;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
                <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/50">
                        {product.sku}
                    </span>
                    <span
                        className={`text-xs px-2 py-0.5 rounded font-semibold ${
                            isOutOfStock
                                ? 'bg-red-950 text-red-400 border border-red-900'
                                : product.stock < 5
                                ? 'bg-amber-950 text-amber-400 border border-amber-900'
                                : 'bg-slate-800 text-slate-300'
                        }`}
                    >
                        Stock: {product.stock}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{product.name}</h3>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">{product.description || 'Sin descripción'}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                    <span className="text-xs text-slate-500 block">Precio Unitario</span>
                    <span className="text-lg font-bold text-white">
                        ${product.price.toLocaleString()} {product.currency}
                    </span>
                </div>
                <button
                    disabled={isOutOfStock}
                    onClick={() => onAddToCart(product)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                        isOutOfStock
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950'
                    }`}
                >
                    + Agregar
                </button>
            </div>
        </div>
    );
};
