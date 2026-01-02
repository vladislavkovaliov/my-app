import { ICreatePaymentBody } from '@/entities/payments/model/payment';

export const createPayments = async ({ ...rest }: ICreatePaymentBody) => {
    const res = await fetch('/api/payments', {
        method: 'POST',
        body: JSON.stringify(rest),
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
