import { PatchCurrencyFormValues } from '@/shared/lib/form/currency-form-schema';

export const updateCurrency = async (data: PatchCurrencyFormValues) => {
    const res = await fetch('/api/currencies', {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to update currency');
    }

    return res.json();
};

export const deleteCurrency = async (id: string) => {
    const res = await fetch('/api/currencies', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw Object.assign(new Error(error.error ?? 'Failed to delete currency'), {
            status: res.status,
            body: error,
        });
    }

    return res.json();
};
