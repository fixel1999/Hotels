export interface UserDTO {
    username: string;
    password: string;
    role?: 'USER' | 'ADMIN';
}

export interface AuthResponse {
    token: string;
}

export interface AuthUser {
    username: string;
    token: string;
    role: 'USER' | 'ADMIN';
}