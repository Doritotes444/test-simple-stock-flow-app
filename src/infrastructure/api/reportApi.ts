import { request } from './httpClient';
import { SalesReport } from '../../domain/types/report.types';

export const reportApi = {
    getSalesReport: async (startDate?: string, endDate?: string): Promise<SalesReport> => {
        const params = new URLSearchParams();
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        
        const queryString = params.toString() ? `?${params.toString()}` : '';
        return request<SalesReport>(`/reports/sales${queryString}`);
    },
};
