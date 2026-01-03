import { useMemo } from 'react';
import * as React from 'react';

import { useI18n } from '@/app-providers/i-18n-provider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CoursesField } from '@/entities/courses/ui/form-fields/courses-field';
import { CurrenciesField } from '@/entities/currencies/ui/form-fields/currencies-field';
import { PaymentAmountField } from '@/entities/payments/ui/form-fields/payment-amount-field';
import { PaymentConfirmField } from '@/entities/payments/ui/form-fields/payment-confirm-field';
import { PaymentPaidAtField } from '@/entities/payments/ui/form-fields/payment-paid-at-field';
import { useCoursesList } from '@/features/payment/payment-sheet-create/hooks/use-courses-list';
import { useCreatePayment } from '@/features/payment/payment-sheet-create/hooks/use-create-payment';
import { useCurrenciesList } from '@/features/payment/payment-sheet-create/hooks/use-currencies-list';

import { usePaymentForm } from '../hooks/use-payment-form';

export interface IPaymentsFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function PaymentForm({ onSuccess, onCancel }: IPaymentsFormProps) {
    const { dict } = useI18n();

    const { data: coursesData } = useCoursesList();

    const { data: currenciesData } = useCurrenciesList();

    const { mutateAsync } = useCreatePayment();

    const form = usePaymentForm();

    const courses = useMemo(() => {
        if (!coursesData) {
            return [];
        }

        return coursesData.data.map((course) => {
            return {
                value: course.id,
                label: course.title,
            };
        });
    }, [coursesData]);

    const currencies = useMemo(() => {
        if (!currenciesData) {
            return [];
        }

        return currenciesData.data.map((currency) => {
            return {
                value: currency.id,
                label: currency.name,
            };
        });
    }, [currenciesData]);

    const handleCancelCallback = () => {
        onCancel();
    };

    const handleResetCallback = () => {
        form.reset();
    };

    const _handlePaidAtResetCallback = () => {
        console.log('handlePaidAtResetCallback');
    };

    const _handlePaidAtSelectCallback = (newDate: Date) => {
        console.log('handlePaidAtSelectCallback', newDate);
    };

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 500));

        console.log(form.getValues());

        const { amount, paidAt, courseId, currencyId } = form.getValues();

        await mutateAsync({
            amount: Number(amount),
            paidAt: paidAt,
            courseId: courseId,
            currencyId: currencyId,
        });

        onSuccess();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-6">
                <PaymentAmountField control={form.control} name="amount" />
                <PaymentConfirmField control={form.control} name="confirmPayment" />
                <PaymentPaidAtField control={form.control} name="paidAt" />
                <CoursesField control={form.control} name="courseId" courses={courses} />
                <CurrenciesField control={form.control} name="currencyId" currencies={currencies} />
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
