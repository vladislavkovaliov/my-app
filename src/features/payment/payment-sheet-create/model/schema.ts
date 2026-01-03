import { z } from 'zod';

export const paymentSchema = z.object({
    // amount: z.string().refine(async (val) => {
    //     const valid = Number(val);
    //
    //     return !isNaN(valid);
    // }),
    amount: z.coerce.number<number>(),
    confirmPayment: z.boolean(),
    paidAt: z.date(),
    courseId: z.string({
        message: 'courseId is required',
    }),
    currencyId: z.string({
        message: 'currencyId is required',
    }),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
