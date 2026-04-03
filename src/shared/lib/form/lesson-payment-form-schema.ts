import { z } from 'zod';

export const lessonPaymentSchema = z.object({
    lessonId: z.string({
        message: 'lessonId is required',
    }),
    paymentId: z.string({
        message: 'paymentId is required',
    }),
    amount: z.coerce.number().positive(),
});

export const patchLessonPaymentSchema = z
    .object({
        id: z.string().min(1),
        lessonId: lessonPaymentSchema.shape.lessonId.optional(),
        paymentId: lessonPaymentSchema.shape.paymentId.optional(),
        amount: lessonPaymentSchema.shape.amount.optional(),
    })
    .strict()
    .refine(
        (data) => {
            const { id: _, ...rest } = data;

            return Object.values(rest).some((v) => v !== undefined);
        },
        { message: 'At least one field is required' },
    );

export type LessonPaymentFormValues = z.infer<typeof lessonPaymentSchema>;
