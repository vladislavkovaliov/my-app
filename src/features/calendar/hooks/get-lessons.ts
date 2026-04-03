import { useQuery } from '@tanstack/react-query';

import { getLessons } from '@/entities/lessons/api/get-lessons-api';
import { Lesson as ILesson, Course as ICourse } from '@/generated/prisma';

interface ILessonWithCourse extends ILesson {
    course: ICourse;
}

export const useLessonList = () => {
    return useQuery<{ total: number; data: ILessonWithCourse[] }>({
        queryKey: ['lesson-list'],
        queryFn: () => {
            return getLessons();
        },
    });
};
