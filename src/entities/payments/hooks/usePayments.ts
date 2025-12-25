import { useQuery } from '@tanstack/react-query';
import { getPayments } from '@/entities/payments/api/paymentApi';
import { Payment } from '@/entities/payments/model/payment';

export const usePayments = () => {
    return useQuery<{ total: number; data: Payment[] }, Error>({
        queryKey: ['todos'],
        queryFn: getPayments,
    });
};
