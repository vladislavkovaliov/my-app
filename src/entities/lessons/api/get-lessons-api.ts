import { Lesson as ILesson, Course as ICourse } from '@/generated/prisma';

export interface ILessonWithCourse extends ILesson {
    course: ICourse;
}

export const getLessons = async (): Promise<{ total: number; data: ILessonWithCourse[] }> => {
    const res = await fetch('/api/lessons', {
        method: 'GET',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch');
    }

    return res.json();
};
