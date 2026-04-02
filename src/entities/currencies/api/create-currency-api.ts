import { ICreateCurrencyBody } from '@/entities/currencies/model/currency';

export const createCurrency = async ({ ...rest }: ICreateCurrencyBody) => {
    const res = await fetch('/api/currencies', {
        method: 'POST',
        body: JSON.stringify(rest),
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
