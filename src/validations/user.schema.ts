import { z } from 'zod';
import { Role } from '../models/User';

export const createUserSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required'
    }).email('Invalid email format'),
    password: z.string({
      required_error: 'Password is required'
    }).min(6, 'Password must be at least 6 characters'),
    name: z.string({
      required_error: 'Name is required'
    }).min(2, 'Name must be at least 2 characters'),
    role: z.nativeEnum(Role).optional()
  })
});

export const updateUserRoleSchema = z.object({
  body: z.object({
    role: z.nativeEnum(Role, {
      errorMap: () => ({ message: 'Invalid Role' })
    })
  }),
  params: z.object({
    id: z.string({ required_error: 'User ID is required' })
  })
});
