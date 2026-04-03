import { ICreateLessonBody } from '@/entities/lessons/model/create-lesson';

export const createLesson = async ({ ...rest }: ICreateLessonBody) => {
    const res = await fetch('/api/lessons', {
        method: 'POST',
        body: JSON.stringify(rest),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch');
    }

    return res.json();
};
