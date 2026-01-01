import { z } from 'zod';

export const paymentSchema = z.object({
    // amount: z.string().refine(async (val) => {
    //     const valid = Number(val);
    //
    //     return !isNaN(valid);
    // }),
    amount: z.coerce.number<number>(),
    confirmPayment: z.boolean(),
    paidAt: z.date().nullable(),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
