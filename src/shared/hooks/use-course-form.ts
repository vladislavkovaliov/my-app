import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { courseSchema, CourseFormValues } from '@/shared/lib/form/course-form-schema';

export const useCourseForm = () => {
    return useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            // amount: 0,
            // confirmPayment: false,
            // paidAt: new Date(),
            // courseId: undefined,
            // currencyId: undefined,
        },
    });
};
