import { useState } from 'react';
import { Product } from '../../domain/types/product.types';
import { saleApi } from '../../infrastructure/api/saleApi';

export interface CartItem {
    product: Product;
    quantity: number;
}

export function useCart(userId: number) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const addToCart = (product: Product, qty: number = 1) => {
        setCart((prev) => {
            const existingIndex = prev.findIndex((item) => item.product.id === product.id);
            if (existingIndex > -1) {
                const updated = [...prev];
                const newQty = updated[existingIndex].quantity + qty;
                if (newQty > product.stock) {
                    setError(`No puedes agregar más de ${product.stock} unidades de ${product.name}`);
                    return prev;
                }
                updated[existingIndex].quantity = newQty;
                return updated;
            } else {
                if (qty > product.stock) {
                    setError(`Stock insuficiente para ${product.name}`);
                    return prev;
                }
                return [...prev, { product, quantity: qty }];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const checkout = async () => {
        if (cart.length === 0) return null;
        setSubmitting(true);
        setError(null);
        try {
            const payload = {
                user_id: userId,
                items: cart.map((item) => ({
                    product_id: item.product.id,
                    quantity: item.quantity,
                })),
            };

            const sale = await saleApi.create(payload);
            clearCart();
            return sale;
        } catch (err: any) {
            setError(err.message || 'Error al procesar la venta');
            return null;
        } finally {
            setSubmitting(false);
        }
    };

    return { cart, addToCart, removeFromCart, clearCart, total, checkout, submitting, error };
}
