import { request } from './httpClient';
import { Product, CreateProductPayload } from '../../domain/types/product.types';

export const productApi = {
    getAll: async (): Promise<{ data: Product[] }> => {
        return request<{ data: Product[] }>('/products');
    },

    create: async (payload: CreateProductPayload): Promise<Product> => {
        return request<Product>('/products', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    },
};
