'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthUser } from '@/types/user';
import { authService } from '@/services/authService';
import { LoginFormData, RegisterFormData } from '@/validation/authSchema';
import { useLoading } from './loadingContext';

interface AuthContextType {
	user: AuthUser | null;
	userLogin: (loginFormData: LoginFormData) => void;
	userRegister: (registerFormData: RegisterFormData) => void;
	userLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	userLogin: () => { },
	userRegister: () => { },
	userLogout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const { register, login, logout } = authService;
	const { hideLoading } = useLoading();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const expToken = localStorage.getItem('tokenExpiry')
		if (token && expToken) {
			try {
				const decoded = jwtDecode(token);
				const now = new Date();
				const expiryDate = new Date(expToken)
				if (now < expiryDate) {
					setUser({
						username: decoded.sub ? decoded.sub : "",
						role: decoded.role,
						token: token
					});
				}
				else {
					localStorage.removeItem('token');
					localStorage.removeItem('tokenExpiry')
				}
				hideLoading();
			} catch {
				localStorage.removeItem('token');
				localStorage.removeItem('tokenExpiry')
				hideLoading();
			}
		}
		hideLoading();
	}, []);

	const userRegister = async (registerFormData: RegisterFormData) => {
		await register(registerFormData);
	}

	const userLogin = async (loginDataForm: LoginFormData) => {
		const { token } = await login(loginDataForm);
		const decoded = jwtDecode(token);

		const expiryDate = new Date(decoded.exp ? decoded.exp * 1000 : 0);

		localStorage.setItem("token", token);
		localStorage.setItem("tokenExpiry", expiryDate.toISOString());

		setUser({
			username: decoded.sub ? decoded.sub : "",
			role: decoded.role,
			token: token
		});
	};

	const userLogout = () => {
		logout();
		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpiry')
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, userLogin, userLogout, userRegister }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);