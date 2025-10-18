import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3, 'User name must have at least 3 chars'),
    password: z.string().min(6, 'Password must have at least 6 chars'),
    role: z.enum(['USER', 'ADMIN']).default('USER'),
});

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;