import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { updatePayment } from '@/entities/payments/api/update-payment-api';
import { Payment as IPayment } from '@/generated/prisma';

export const useUpdatePayment = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (data: Partial<IPayment>) => {
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
