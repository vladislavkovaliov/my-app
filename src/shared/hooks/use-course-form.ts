import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { courseSchema, CourseFormValues } from '@/shared/lib/form/course-form-schema';

export const useCourseForm = () => {
    return useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            currencyId: '',
        },
    });
};
