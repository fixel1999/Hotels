import { z } from 'zod';

export const registerSchema = z.object({
    username: z
        .string()
        .nonempty("Username is required")
        .min(3, 'Username must have at least 3 chars'),
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, 'Password must have at least 6 chars'),
    role: z
        .enum(['USER', 'ADMIN'])
        .default('USER'),
});

export const loginSchema = z.object({
    username: z
        .string()
        .nonempty("Username is required")
        .min(3, 'Username must have at least 3 chars'),
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, 'Password must have at least 6 chars'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;