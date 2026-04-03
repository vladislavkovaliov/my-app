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
import { Textarea } from '@/components/ui/textarea';

interface ICourseDescriptionFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    showLabel?: boolean;
    showDescription?: boolean;
}

export function CourseDescriptionField<TFormValues extends FieldValues>({
    control,
    name,
    showLabel = true,
    showDescription = true,
}: ICourseDescriptionFieldProps<TFormValues>) {
    const { dict } = useI18n();

    const labels = dict.entities['form-fields'].course.description;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {showLabel ? <FormLabel>{labels.label}</FormLabel> : null}
                    <FormControl>
                        <Textarea
                            placeholder={labels.placeholder}
                            className={
                                showLabel && showDescription ? 'min-h-[88px]' : 'min-h-[52px]'
                            }
                            {...field}
                        />
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
