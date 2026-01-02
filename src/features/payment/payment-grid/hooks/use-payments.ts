import { useQuery } from '@tanstack/react-query';
import { getPayments } from '@/entities/payments/api/payment-api';
import { useSession } from 'next-auth/react';

export const usePayments = () => {
    const { data: session } = useSession();

    const userEmail = session?.user?.email;

    return useQuery({
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
