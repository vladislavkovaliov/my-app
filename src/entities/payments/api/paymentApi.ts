import { Payment } from '../model/payment';
import { fetcher } from '@/shared/api/fetcher';

export const getPayments = async (): Promise<{ total: number; data: Payment[] }> => {
    return fetcher('/api/payments');
};
