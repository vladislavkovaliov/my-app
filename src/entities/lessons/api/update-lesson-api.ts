import { IUpdateLessonPayload } from '@/entities/lessons/model/update-lesson';

export const updateLesson = async (payload: IUpdateLessonPayload) => {
    const res = await fetch('/api/lessons', {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error('Failed to update lesson');
    }

    return res.json();
};
