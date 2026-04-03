import { z } from 'zod';

export const lessonSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    startTime: z.date(),
    endTime: z.date(),
    courseId: z.string().min(1, { message: 'Course is required' }),
});

export type LessonFormValues = z.infer<typeof lessonSchema>;

/** Схема для API: принимает строки и преобразует в Date */
export const lessonApiSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    courseId: z.string().min(1, { message: 'Course is required' }),
});

export type LessonApiValues = z.infer<typeof lessonApiSchema>;

/** Частичное обновление урока (PATCH): общие правила с `lessonSchema`, плюс обязательный `id`. */
export const patchLessonSchema = z
    .object({
        id: z.string().min(1, { message: 'lesson id is required' }),
        title: lessonSchema.shape.title.optional(),
        startTime: z.coerce.date().optional(),
        endTime: z.coerce.date().optional(),
        courseId: lessonSchema.shape.courseId.optional(),
    })
    .strict()
    .refine(
        (data) => {
            const { id: _id, ...rest } = data;

            return Object.values(rest).some((v) => v !== undefined);
        },
        { message: 'At least one of title, startTime, endTime, courseId is required' },
    );

export type PatchLessonFormValues = z.infer<typeof patchLessonSchema>;
