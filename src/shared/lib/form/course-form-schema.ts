import { z } from 'zod';

export const courseSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().optional(),
    price: z.coerce.number<number>().positive({ message: 'Price must be greater than 0' }),
    currencyId: z.string().min(1, { message: 'currencyId is required' }),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
