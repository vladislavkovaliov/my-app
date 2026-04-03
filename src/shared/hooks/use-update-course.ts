import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { IUpdateCoursePayload, updateCourse } from '@/entities/courses/api/update-course-api';

export const useUpdateCourse = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (data: IUpdateCoursePayload) => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return updateCourse(data);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['courses'] });
        },
    });
};
