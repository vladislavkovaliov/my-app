import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { currencySchema, CurrencyFormValues } from '@/shared/lib/form/currency-form-schema';

export const useCurrencyForm = () => {
    return useForm<CurrencyFormValues>({
        resolver: zodResolver(currencySchema),
        defaultValues: {
            code: '',
            name: '',
            symbol: '',
            isActive: true,
        },
    });
};
