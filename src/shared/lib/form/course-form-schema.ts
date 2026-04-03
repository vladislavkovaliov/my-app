import { z } from 'zod';

export const courseSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().optional(),
    price: z.coerce.number<number>().positive({ message: 'Price must be greater than 0' }),
    currencyId: z.string().min(1, { message: 'currencyId is required' }),
});

export type CourseFormValues = z.infer<typeof courseSchema>;

/** Частичное обновление курса (PATCH): общие правила с `courseSchema`, плюс обязательный `id`. */
export const patchCourseSchema = z
    .object({
        id: z.string().min(1, { message: 'course id is required' }),
        title: courseSchema.shape.title.optional(),
        description: z.union([z.string(), z.null()]).optional(),
        price: courseSchema.shape.price.optional(),
        currencyId: courseSchema.shape.currencyId.optional(),
    })
    .strict()
    .refine(
        (data) => {
            const { id: _id, ...rest } = data;

            return Object.values(rest).some((v) => v !== undefined);
        },
        { message: 'At least one of title, description, price, currencyId is required' },
    );
