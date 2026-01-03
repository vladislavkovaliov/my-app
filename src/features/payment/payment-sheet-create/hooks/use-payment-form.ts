import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { paymentSchema, PaymentFormValues } from '../model/schema';

export const usePaymentForm = () => {
    return useForm<PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            amount: 0,
            confirmPayment: false,
            paidAt: new Date(),
            courseId: undefined,
            currencyId: undefined,
        },
    });
};
