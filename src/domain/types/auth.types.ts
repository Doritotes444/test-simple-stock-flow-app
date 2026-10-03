export interface User {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'CASHIER' | 'MANAGER';
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginPayload {
    email: string;
    password: string;
}
