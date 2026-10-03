import { useState, useEffect, useCallback } from 'react';
import { Product, CreateProductPayload } from '../../domain/types/product.types';
import { productApi } from '../../infrastructure/api/productApi';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await productApi.getAll();
            setProducts(response.data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar productos');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const createProduct = async (payload: CreateProductPayload) => {
        try {
            await productApi.create(payload);
            await fetchProducts();
            return true;
        } catch (err: any) {
            setError(err.message || 'Error al crear el producto');
            return false;
        }
    };

    return { products, loading, error, refresh: fetchProducts, createProduct };
}
