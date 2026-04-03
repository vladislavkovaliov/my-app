import { z } from 'zod';

export const currencySchema = z.object({
    code: z.string().min(1, { message: 'Code is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    symbol: z.string().optional(),
    isActive: z.boolean(),
});

export type CurrencyFormValues = z.infer<typeof currencySchema>;

/** Частичное обновление валюты (PATCH): общие правила с `currencySchema`, плюс обязательный `id`. */
export const patchCurrencySchema = z
    .object({
        id: z.string().min(1, { message: 'currency id is required' }),
        code: currencySchema.shape.code.optional(),
        name: currencySchema.shape.name.optional(),
        symbol: z.union([z.string(), z.null()]).optional(),
        isActive: currencySchema.shape.isActive.optional(),
    })
    .strict()
    .refine(
        (data) => {
            const { id: _id, ...rest } = data;

            return Object.values(rest).some((v) => v !== undefined);
        },
        { message: 'At least one of code, name, symbol, isActive is required' },
    );

export type PatchCurrencyFormValues = z.infer<typeof patchCurrencySchema>;
