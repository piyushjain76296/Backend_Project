import { z } from 'zod';
import { TransactionType } from '../models/FinancialRecord';

export const createRecordSchema = z.object({
  body: z.object({
    amount: z.number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number'
    }).positive('Amount must be positive'),
    type: z.nativeEnum(TransactionType, {
      errorMap: () => ({ message: 'Type must be INCOME or EXPENSE' })
    }),
    category: z.string({
      required_error: 'Category is required'
    }).min(1, 'Category cannot be empty'),
    description: z.string().optional()
  })
});

export const updateRecordSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    type: z.nativeEnum(TransactionType).optional(),
    category: z.string().min(1).optional(),
    description: z.string().optional()
  }).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided to update',
    path: []
  }),
  params: z.object({
    id: z.string({ required_error: 'Record ID is required' })
  })
});

export const getRecordsQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
    type: z.nativeEnum(TransactionType).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    category: z.string().optional()
  })
});
