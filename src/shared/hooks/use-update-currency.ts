import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { updateCurrency } from '@/entities/currencies/api/currency-api';
import { PatchCurrencyFormValues } from '@/shared/lib/form/currency-form-schema';

export const useUpdateCurrency = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (data: PatchCurrencyFormValues) => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return updateCurrency(data);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['currencies'] });
        },
    });
};
