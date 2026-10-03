/**
 * Fuente ejecutable de DTOs del contrato de API (api-contract.md / architecture.md §2.1).
 */

export interface ProductApiDTO {
    id: number;
    sku: string;
    name: string;
    description: string | null;
    price: number | string;
    currency: string;
    stock: number;
    category_id: number;
    is_active: boolean;
}

export interface SaleItemApiDTO {
    id?: number;
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number | string;
    subtotal: number | string;
}

export interface SaleApiDTO {
    id: number;
    user_id: number;
    total: number | string;
    currency: string;
    created_at: string;
    items: SaleItemApiDTO[];
}

export interface ProblemDetailsApiDTO {
    type: string;
    title: string;
    status: number;
    detail: string;
    invalid_params?: Array<{ name: string; reason: string }>;
}
