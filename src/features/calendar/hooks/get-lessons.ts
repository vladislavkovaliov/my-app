import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getLessons } from '@/entities/lessons/api/get-lessons-api';
import { Lesson as ILesson, Course as ICourse } from '@/generated/prisma';

interface ILessonWithCourse extends ILesson {
    course: ICourse;
}

export const useLessonList = () => {
    const { data: session } = useSession();

    const userEmail = session?.user?.email;

    return useQuery<{ total: number; data: ILessonWithCourse[] }>({
        queryKey: ['lesson-list', userEmail],
        queryFn: () => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return getLessons({ email: userEmail });
        },
        enabled: !!userEmail,
    });
};
