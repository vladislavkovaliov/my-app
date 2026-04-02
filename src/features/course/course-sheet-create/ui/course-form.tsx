import { useMemo } from 'react';
import * as React from 'react';
import { useWatch } from 'react-hook-form';

import { useI18n } from '@/app-providers/i-18n-provider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CurrenciesField } from '@/entities/currencies/ui/form-fields/currencies-field';
import { CourseDescriptionField } from '@/entities/courses/ui/form-fields/course-description-field';
import { CoursePriceField } from '@/entities/courses/ui/form-fields/course-price-field';
import { CourseTitleField } from '@/entities/courses/ui/form-fields/course-title-field';
import { useCreateCourse } from '@/features/course/course-sheet-create/hooks/use-create-course';
import { useCurrenciesList } from '@/features/payment/payment-sheet-create/hooks/use-currencies-list';
import { useCourseForm } from '@/shared/hooks/use-course-form';

export interface ICourseFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function CourseForm({ onSuccess, onCancel }: ICourseFormProps) {
    const { dict } = useI18n();

    const { data: currenciesData } = useCurrenciesList();

    const { mutateAsync } = useCreateCourse();

    const form = useCourseForm();

    const title = useWatch({ name: 'title', control: form.control });
    const currencyId = useWatch({ name: 'currencyId', control: form.control });
    const price = useWatch({ name: 'price', control: form.control });

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

    const disableSubmitButton = !String(title ?? '').trim() || !currencyId || !(Number(price) > 0);

    const handleCancelCallback = () => {
        onCancel();
    };

    const handleResetCallback = () => {
        form.reset();
    };

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 500));

        const { title: rawTitle, description, price: rawPrice, currencyId: cid } = form.getValues();

        const trimmed = String(rawTitle ?? '').trim();
        const desc = String(description ?? '').trim();

        await mutateAsync({
            title: trimmed,
            ...(desc ? { description: desc } : {}),
            price: Number(rawPrice),
            currencyId: cid,
        });

        onSuccess();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <CourseTitleField control={form.control} name="title" />
                <CourseDescriptionField control={form.control} name="description" />
                <CoursePriceField control={form.control} name="price" />
                <CurrenciesField control={form.control} name="currencyId" currencies={currencies} />
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
