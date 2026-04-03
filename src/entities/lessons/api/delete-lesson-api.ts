export const deleteLesson = async (id: string) => {
    const res = await fetch('/api/lessons', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
    });

    if (!res.ok) {
        throw new Error('Failed to delete lesson');
    }

    return res.json();
};
