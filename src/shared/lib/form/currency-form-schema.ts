import { z } from 'zod';

export const currencySchema = z.object({
    code: z.string().min(1, { message: 'Code is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    symbol: z.string().optional(),
    isActive: z.boolean(),
});

export type CurrencyFormValues = z.infer<typeof currencySchema>;
