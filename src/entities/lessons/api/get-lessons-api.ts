import { ILessonsParams } from '@/entities/lessons/model/lesson';
import { Lesson as ILesson, Course as ICourse } from '@/generated/prisma';

interface ILessonWithCourse extends ILesson {
    course: ICourse;
}
export const getLessons = async ({
    email,
}: ILessonsParams): Promise<{ total: number; data: ILessonWithCourse[] }> => {
    const params = new URLSearchParams();

    params.set('email', email);

    const res = await fetch('/api/lessons' + '?' + params.toString(), {
        method: 'GET',
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
