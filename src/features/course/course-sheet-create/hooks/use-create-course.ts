import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { createCourse } from '@/entities/courses/api/create-course-api';
import { ICreateCourseBody } from '@/entities/courses/model/course';

export const useCreateCourse = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (data: ICreateCourseBody) => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return createCourse(data);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['courses'] });
        },
    });
};
