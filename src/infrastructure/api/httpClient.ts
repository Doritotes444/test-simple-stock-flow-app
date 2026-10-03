const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('auth_token');
    
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Error en la petición' }));
        throw new Error(errorData.detail || errorData.title || `HTTP Error ${response.status}`);
    }

    return response.json();
}
