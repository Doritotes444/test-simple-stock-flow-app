import { request } from './httpClient';
import { AuthResponse, LoginPayload } from '../../domain/types/auth.types';

export const authApi = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        return request<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    },
};
