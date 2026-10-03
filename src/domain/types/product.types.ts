export interface Product {
    id: number;
    sku: string;
    name: string;
    description: string | null;
    price: number;
    currency: string;
    stock: number;
    categoryId: number;
    isActive: boolean;
}

export interface CreateProductPayload {
    sku: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category_id: number;
}
