export const deletePayment = async (id: string) => {
    const res = await fetch('/api/payments', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
    });

    if (!res.ok) {
        throw new Error('Failed to delete payment');
    }

    return res.json();
};
