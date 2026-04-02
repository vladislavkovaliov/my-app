import * as React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useI18n } from '@/app-providers/i-18n-provider';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ICoursePriceFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
}

export function CoursePriceField<TFormValues extends FieldValues>({
    control,
    name,
}: ICoursePriceFieldProps<TFormValues>) {
    const { dict } = useI18n();

    const labels = dict.entities['form-fields'].course.price;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{labels.label}</FormLabel>
                    <FormControl>
                        <Input placeholder={labels.placeholder} {...field} />
                    </FormControl>
                    <FormDescription>{labels.description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
