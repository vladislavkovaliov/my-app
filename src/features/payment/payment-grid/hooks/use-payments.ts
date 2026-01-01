import { useQuery } from '@tanstack/react-query';
import { getPayments } from '@/entities/payments/api/payment-api';
import { Payment } from '@/entities/payments/model/payment';
import { useSession } from 'next-auth/react';

export const usePayments = () => {
    const { data: session } = useSession();

    const userEmail = session?.user?.email;

    return useQuery<{ total: number; data: Payment[] }>({
        queryKey: ['payments', userEmail],
        queryFn: () => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return getPayments({
                email: userEmail,
            });
        },
        enabled: !!userEmail,
    });
};
