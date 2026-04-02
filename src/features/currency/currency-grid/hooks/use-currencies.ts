import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getCurrencies } from '@/entities/currencies/api/get-currencies-api';

export const useCurrencies = () => {
    const { data: session } = useSession();

    const userEmail = session?.user?.email;

    return useQuery({
        queryKey: ['currencies', userEmail],
        queryFn: () => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return getCurrencies({});
        },
        enabled: !!userEmail,
    });
};
