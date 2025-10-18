import { api } from './api';
import { AuthResponse } from '@/types/user';
import { RegisterFormData, LoginFormData } from '@/validation/authSchema';

export const authService = {
	register: async (data: RegisterFormData): Promise<void> => {
		await api.post('/auth/register', data);
	},

	login: async (data: LoginFormData): Promise<AuthResponse> => {
		try {
			const response = await api.post('/auth/login', data);
			const token = response.data;

			return { token };
		}
		catch {
			throw new Error("Credenciales inválidas o error de conexión.");
		}
	},

	logout: (): void => {
		api.interceptors.request.use(config => {
			delete config.headers.Authorization;
			return config;
		})
	}
};