import { Currency as ICurrency } from '@/generated/prisma';

export interface ICurrenciesParams {}

export const getCurrencies = async (
    _: ICurrenciesParams,
): Promise<{ total: number; data: ICurrency[] }> => {
    const res = await fetch('/api/currencies', {
        method: 'GET',
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
};
