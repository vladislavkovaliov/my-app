import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { deletePayment } from '@/entities/payments/api/delete-payment-api';

export const useDeletePayment = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (id: string) => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return deletePayment(id);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['payments', userEmail] });
        },
    });
};
