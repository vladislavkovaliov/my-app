import * as React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useI18n } from '@/app-providers/i-18n-provider/i-18n-provider';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ICurrencyCodeFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
}

export function CurrencyCodeField<TFormValues extends FieldValues>({
    control,
    name,
}: ICurrencyCodeFieldProps<TFormValues>) {
    const { dict } = useI18n();

    const labels = dict.entities['form-fields'].currency.code;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{labels.label}</FormLabel>
                    <FormControl>
                        <Input placeholder={labels.placeholder} autoComplete="off" {...field} />
                    </FormControl>
                    <FormDescription>{labels.description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
