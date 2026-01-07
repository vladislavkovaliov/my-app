import { IUpdatePaymentBody } from '@/entities/payments/model/payment';

export const updatePayment = async ({ ...rest }: IUpdatePaymentBody) => {
    const res = await fetch('/api/payments', {
        method: 'PATCH',
        body: JSON.stringify(rest),
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
