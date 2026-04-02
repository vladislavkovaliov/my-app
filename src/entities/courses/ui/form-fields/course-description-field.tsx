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
import { Textarea } from '@/components/ui/textarea';

interface ICourseDescriptionFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
}

export function CourseDescriptionField<TFormValues extends FieldValues>({
    control,
    name,
}: ICourseDescriptionFieldProps<TFormValues>) {
    const { dict } = useI18n();

    const labels = dict.entities['form-fields'].course.description;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{labels.label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={labels.placeholder}
                            className="min-h-[88px]"
                            {...field}
                        />
                    </FormControl>
                    <FormDescription>{labels.description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
