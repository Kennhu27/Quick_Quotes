import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  passwordHash: z.string().min(1, 'Password hash is required'),
});
