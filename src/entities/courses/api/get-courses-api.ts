import { Course as ICourse, Currency as ICurrency } from '@/generated/prisma';

export type CourseRow = ICourse & {
    currency: Pick<ICurrency, 'id' | 'code' | 'name' | 'symbol'>;
};

export interface ICoursesParams {}

export const getCourses = async (
    _: ICoursesParams,
): Promise<{ total: number; data: CourseRow[] }> => {
    const res = await fetch('/api/courses', {
        method: 'GET',
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
