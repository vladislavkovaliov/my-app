import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { lessonSchema, LessonFormValues } from '@/shared/lib/form/lesson-form-schema';

export const useLessonForm = () => {
    return useForm<LessonFormValues>({
        resolver: zodResolver(lessonSchema),
        defaultValues: {
            title: '',
            startTime: new Date(),
            endTime: new Date(),
            courseId: '',
        },
    });
};
