import { z } from 'zod';

export const courseSchema = z.object({
    // amount: z.coerce.number<number>(),
    // confirmPayment: z.boolean(),
    // paidAt: z.date(),
    // courseId: z.string({
    //     message: 'courseId is required',
    // }),
    // currencyId: z.string({
    //     message: 'currencyId is required',
    // }),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
