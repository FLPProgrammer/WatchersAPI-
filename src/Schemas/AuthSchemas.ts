import { z } from 'zod';

export const RegisterSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must have at least 2 characters'),

    email: z
        .string()
        .email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must have at least 8 characters'),
});

export const LoginSchema = z.object({
    email: z
        .string()
        .email('Invalid email address'),

    password: z
        .string()
        .min(8, 'Password must have at least 8 characters'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;