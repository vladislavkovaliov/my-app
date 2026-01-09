import { Payment as IPayment } from '@/generated/prisma';

export const updatePayment = async ({ ...rest }: Partial<IPayment>) => {
    const res = await fetch('/api/payments', {
        method: 'PATCH',
        body: JSON.stringify(rest),
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
