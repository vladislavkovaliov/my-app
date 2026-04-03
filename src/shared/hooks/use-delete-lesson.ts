import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { deleteLesson } from '@/entities/lessons/api/delete-lesson-api';

export const useDeleteLesson = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (id: string) => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return deleteLesson(id);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['lessons'] });
        },
    });
};
