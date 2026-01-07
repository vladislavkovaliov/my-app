import { IPaymentParams } from '@/entities/payments/model/payment';
import { Payment as IPayment } from '@/generated/prisma';

export const getPayments = async ({
    email,
}: IPaymentParams): Promise<{ total: number; data: IPayment[] }> => {
    const params = new URLSearchParams();

    params.set('email', email);

    const res = await fetch('/api/payments' + '?' + params.toString(), {
        method: 'GET',
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
