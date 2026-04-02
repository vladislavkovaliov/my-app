import { useWatch } from 'react-hook-form';

import { useI18n } from '@/app-providers/i-18n-provider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CurrencyCodeField } from '@/entities/currencies/ui/form-fields/currency-code-field';
import { CurrencyIsActiveField } from '@/entities/currencies/ui/form-fields/currency-is-active-field';
import { CurrencyNameField } from '@/entities/currencies/ui/form-fields/currency-name-field';
import { CurrencySymbolField } from '@/entities/currencies/ui/form-fields/currency-symbol-field';
import { useCreateCurrency } from '@/features/currency/currency-sheet-create/hooks/use-create-currency';
import { useCurrencyForm } from '@/shared/hooks/use-currency-form';

export interface ICurrencyFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function CurrencyForm({ onSuccess, onCancel }: ICurrencyFormProps) {
    const { dict } = useI18n();

    const { mutateAsync } = useCreateCurrency();

    const form = useCurrencyForm();

    const code = useWatch({ name: 'code', control: form.control });
    const name = useWatch({ name: 'name', control: form.control });

    const disableSubmitButton = !String(code ?? '').trim() || !String(name ?? '').trim();

    const handleCancelCallback = () => {
        onCancel();
    };

    const handleResetCallback = () => {
        form.reset();
    };

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 500));

        const values = form.getValues();
        const codeTrim = String(values.code ?? '')
            .trim()
            .toUpperCase();
        const nameTrim = String(values.name ?? '').trim();
        const symTrim = String(values.symbol ?? '').trim();

        await mutateAsync({
            code: codeTrim,
            name: nameTrim,
            ...(symTrim ? { symbol: symTrim } : {}),
            isActive: values.isActive,
        });

        onSuccess();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <CurrencyCodeField control={form.control} name="code" />
                <CurrencyNameField control={form.control} name="name" />
                <CurrencySymbolField control={form.control} name="symbol" />
                <CurrencyIsActiveField control={form.control} name="isActive" />
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleCancelCallback}>
                        {dict.features['payment-form'].cancel}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleResetCallback}>
                        {dict.features['payment-form'].reset}
                    </Button>
                    <Button type="submit" disabled={disableSubmitButton}>
                        {dict.features['payment-form'].submit}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
