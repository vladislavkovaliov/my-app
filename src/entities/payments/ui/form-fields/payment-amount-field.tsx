import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useI18n } from '@/app-providers/i-18n-provider';

type IPaymentAmountFieldProps<TFormValues extends FieldValues> = {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
};

export function PaymentAmountField<TFormValues extends FieldValues>({
    control,
    name,
}: IPaymentAmountFieldProps<TFormValues>) {
    const { dict } = useI18n();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{dict.entities['form-fields'].payment.amount.label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={dict.entities['form-fields'].payment.amount.placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        {dict.entities['form-fields'].payment.amount.description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
