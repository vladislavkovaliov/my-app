import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { createCurrency } from '@/entities/currencies/api/create-currency-api';
import { ICreateCurrencyBody } from '@/entities/currencies/model/currency';

export const useCreateCurrency = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (data: ICreateCurrencyBody) => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return createCurrency(data);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['currencies'] });
            await qc.invalidateQueries({ queryKey: ['currencies-list'] });
        },
    });
};
