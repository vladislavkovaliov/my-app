import { Course as ICourse } from '@/generated/prisma';

export type IUpdateCoursePayload = {
    id: ICourse['id'];
    title?: ICourse['title'];
    description?: ICourse['description'];
    price?: ICourse['price'];
    currencyId?: ICourse['currencyId'];
};

export const updateCourse = async ({ id, ...rest }: IUpdateCoursePayload) => {
    const res = await fetch('/api/courses', {
        method: 'PATCH',
        body: JSON.stringify({ id, ...rest }),
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
