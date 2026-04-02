import { ICreateCourseBody } from '@/entities/courses/model/course';

export const createCourse = async ({ ...rest }: ICreateCourseBody) => {
    const res = await fetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify(rest),
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
