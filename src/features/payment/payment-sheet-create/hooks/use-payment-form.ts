import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { paymentSchema, PaymentFormValues } from '../model/schema';

export const usePaymentForm = () => {
    return useForm<PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            amount: '',
            confirmPayment: false,
            paidAt: null,
        },
    });
};
