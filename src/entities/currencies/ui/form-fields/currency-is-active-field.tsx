import * as React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useI18n } from '@/app-providers/i-18n-provider/i-18n-provider';
import { Checkbox } from '@/components/ui/checkbox';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

interface ICurrencyIsActiveFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
}

export function CurrencyIsActiveField<TFormValues extends FieldValues>({
    control,
    name,
}: ICurrencyIsActiveFieldProps<TFormValues>) {
    const { dict } = useI18n();

    const labels = dict.entities['form-fields'].currency.isActive;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={(v) => {
                                field.onChange(v === true);
                            }}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>{labels.label}</FormLabel>
                        <FormDescription>{labels.description}</FormDescription>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
