import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { createPayments } from '@/entities/payments/api/create-payment-api';
import { ICreatePaymentBody } from '@/entities/payments/model/payment';

export const useCreatePayment = () => {
    const { data: session } = useSession();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (data: ICreatePaymentBody) => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return createPayments(data);
        },
    });
};
