import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { deleteCurrency } from '@/entities/currencies/api/currency-api';

export const useDeleteCurrency = () => {
    const { data: session } = useSession();
    const qc = useQueryClient();

    const userEmail = session?.user?.email;

    return useMutation({
        mutationFn: (id: string) => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return deleteCurrency(id);
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ['currencies'] });
        },
        onError: (error) => {
            const err = error as { status?: number; body?: { error?: string } };

            if (err.status === 400) {
                toast.error(err.body?.error ?? 'Failed to delete currency');
            } else {
                toast.error('Failed to delete currency');
            }
        },
    });
};
