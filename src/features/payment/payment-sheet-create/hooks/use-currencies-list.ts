import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getCurrencies } from '@/entities/currencies/api/get-currencies-api';
import { Currency as ICurrency } from '@/generated/prisma';

export const useCurrenciesList = () => {
    const { data: session } = useSession();

    const userEmail = session?.user?.email;

    return useQuery<{ total: number; data: ICurrency[] }>({
        queryKey: ['currencies-list', userEmail],
        queryFn: () => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return getCurrencies({});
        },
        enabled: !!userEmail,
    });
};
