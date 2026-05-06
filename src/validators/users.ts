import { z } from 'zod';

export const CreateUserSchema = z.object({
  userId: z.string(),
  name: z.string().min(1).max(18),
  email: z.string(),
  passwordHash: z.string().min(8).max(64),
});
