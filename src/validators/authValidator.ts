import { z } from 'zod';

export const RegistrationSchema = z.object({
  name: z.string().min(1).max(20),
  email: z.email(),
  // Enforce minimum complexity before hashing
  password: z.string().min(8).max(64),
});

export const LoginSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8).max(64),
  passwordHash: z.string(),
});
export type RegistrationBody = z.infer<typeof RegistrationSchema>;

export type LoginBody = z.infer<typeof LoginSchema>;
