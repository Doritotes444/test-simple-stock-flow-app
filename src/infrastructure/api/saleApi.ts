import { request } from './httpClient';
import { Sale, CreateSalePayload } from '../../domain/types/sale.types';

export const saleApi = {
    create: async (payload: CreateSalePayload): Promise<Sale> => {
        return request<Sale>('/sales', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    },
};
