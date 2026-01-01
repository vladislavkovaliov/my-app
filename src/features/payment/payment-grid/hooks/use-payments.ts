import { useQuery } from '@tanstack/react-query';
import { getPayments } from '@/entities/payments/api/payment-api';
import { Payment } from '@/entities/payments/model/payment';

export const usePayments = () => {
    return useQuery<{ total: number; data: Payment[] }, Error>({
        queryKey: ['payments'],
        queryFn: () => {
            return getPayments({
                email: 'v.v.kovaliov@gmail.com',
            });
        },
    });
};
