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

interface ICurrencySymbolFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    showLabel?: boolean;
    showDescription?: boolean;
}

export function CurrencySymbolField<TFormValues extends FieldValues>({
    control,
    name,
    showLabel = true,
    showDescription = true,
}: ICurrencySymbolFieldProps<TFormValues>) {
    const { dict } = useI18n();

    const labels = dict.entities['form-fields'].currency.symbol;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {showLabel ? <FormLabel>{labels.label}</FormLabel> : null}
                    <FormControl>
                        <Input placeholder={labels.placeholder} {...field} />
                    </FormControl>
                    {showDescription ? (
                        <FormDescription>{labels.description}</FormDescription>
                    ) : null}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
