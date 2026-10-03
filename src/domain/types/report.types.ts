import { Sale } from './sale.types';

export interface SalesReport {
    total_transactions: number;
    total_revenue: number;
    currency: string;
    sales: Sale[];
}
