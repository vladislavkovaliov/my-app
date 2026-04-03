import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { updateLesson } from '@/entities/lessons/api/update-lesson-api';
import { IUpdateLessonPayload } from '@/entities/lessons/model/update-lesson';

export const useUpdateLesson = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (data: IUpdateLessonPayload) => {
            if (!session) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return updateLesson(data);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['lessons'] });
        },
    });
};
