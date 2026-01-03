import { IPaymentParams, Payment } from '@/entities/payments/model/payment';

export const getPayments = async ({
    email,
}: IPaymentParams): Promise<{ total: number; data: Payment[] }> => {
    const params = new URLSearchParams();

    params.set('email', email);

    const res = await fetch('/api/payments' + '?' + params.toString(), {
        method: 'GET',
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
