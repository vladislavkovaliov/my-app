import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { updatePayment } from '@/entities/payments/api/update-payment-api';
import { IUpdatePaymentBody } from '@/entities/payments/model/payment';

export const useUpdatePayment = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (data: IUpdatePaymentBody) => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return updatePayment(data);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['payments'] });
        },
    });
};
