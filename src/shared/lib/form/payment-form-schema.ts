import { z } from 'zod';

import { ALLOWED_STATUSES } from '@/entities/payments/model/payment';

export const paymentSchema = z.object({
    amount: z.coerce.number().positive(),
    confirmPayment: z.boolean(),
    paidAt: z.coerce.date(),
    courseId: z.string({
        message: 'courseId is required',
    }),
    currencyId: z.string({
        message: 'currencyId is required',
    }),
});

export const patchPaymentSchema = z
    .object({
        id: z.string().min(1),
        amount: paymentSchema.shape.amount.optional(),
        paidAt: paymentSchema.shape.paidAt.optional(),
        status: z.enum(ALLOWED_STATUSES).optional(),
    })
    .strict()
    .refine(
        (data) => {
            const { id: _, ...rest } = data;

            return Object.values(rest).some((v) => v !== undefined);
        },
        { message: 'At least one field is required' },
    );

export type PaymentFormValues = z.infer<typeof paymentSchema>;
