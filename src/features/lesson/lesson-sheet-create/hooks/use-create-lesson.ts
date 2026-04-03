import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { createLesson } from '@/entities/lessons/api/create-lesson-api';
import { ICreateLessonBody } from '@/entities/lessons/model/create-lesson';

export const useCreateLesson = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (data: ICreateLessonBody) => {
            if (!session) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return createLesson(data);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['lessons'] });
        },
    });
};
