import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import * as React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { useI18n } from '@/app-providers/i-18n-provider';

interface IPaymentConfirmFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
}

export function PaymentConfirmField<TFormValues extends FieldValues>({
    control,
    name,
}: IPaymentConfirmFieldProps<TFormValues>) {
    const { dict } = useI18n();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="flex items-center space-x-2">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{dict.entities['form-fields'].payment.confirm.label}</FormLabel>
                    </div>
                    <FormDescription>
                        {dict.entities['form-fields'].payment.confirm.description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
