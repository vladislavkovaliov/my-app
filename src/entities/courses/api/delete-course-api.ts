export const deleteCourse = async (id: string) => {
    const res = await fetch('/api/courses', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
    });

    if (!res.ok) {
        throw new Error('Failed to delete course');
    }

    return res.json();
};
