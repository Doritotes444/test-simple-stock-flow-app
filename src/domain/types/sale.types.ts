export interface SaleItem {
    id?: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

export interface Sale {
    id: number;
    userId: number;
    total: number;
    currency: string;
    createdAt: string;
    items: SaleItem[];
}

export interface CreateSaleItemPayload {
    product_id: number;
    quantity: number;
}

export interface CreateSalePayload {
    user_id: number;
    items: CreateSaleItemPayload[];
}
