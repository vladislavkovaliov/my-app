import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { deleteCourse } from '@/entities/courses/api/delete-course-api';

export const useDeleteCourse = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (id: string) => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return deleteCourse(id);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['courses'] });
        },
    });
};
