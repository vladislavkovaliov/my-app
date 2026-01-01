import { PaymentAmountField } from '@/entities/payments/ui/form-fields/payment-amount-field';
import { PaymentConfirmField } from '@/entities/payments/ui/form-fields/payment-confirm-field';
import { PaymentPaidAtField } from '@/entities/payments/ui/form-fields/payment-paid-at-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import * as React from 'react';
import { usePaymentForm } from '../hooks/use-payment-form';
import { useI18n } from '@/app-providers/i-18n-provider';

export interface IPaymentsFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function PaymentForm({ onSuccess, onCancel }: IPaymentsFormProps) {
    const { dict } = useI18n();

    const form = usePaymentForm();

    const handleCancelCallback = () => {
        onCancel();
    };

    const handleResetCallback = () => {
        form.reset();
    };

    const handlePaidAtResetCallback = () => {
        console.log('handlePaidAtResetCallback');
    };

    const handlePaidAtSelectCallback = (newDate: Date) => {
        console.log('handlePaidAtSelectCallback', newDate);
    };

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 500));

        console.log(form.getValues());

        onSuccess();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-6">
                <PaymentAmountField control={form.control} name="amount" />
                <PaymentConfirmField control={form.control} name="confirmPayment" />
                <PaymentPaidAtField control={form.control} name="paidAt" />
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleCancelCallback}>
                        {dict.features['payment-form'].cancel}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleResetCallback}>
                        {dict.features['payment-form'].reset}
                    </Button>
                    <Button type="submit">{dict.features['payment-form'].submit}</Button>
                </div>
            </form>
        </Form>
    );
}
