import { Course as ICourse } from '@/generated/prisma';

export interface ICoursesParams {}

export const getCourses = async (
    _: ICoursesParams,
): Promise<{ total: number; data: ICourse[] }> => {
    const res = await fetch('/api/courses', {
        method: 'GET',
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
