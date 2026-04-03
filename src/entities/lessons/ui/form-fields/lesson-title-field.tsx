'use client';

import { Control, FieldValues, Path } from 'react-hook-form';

import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ILessonTitleFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    showLabel?: boolean;
    showDescription?: boolean;
}

export function LessonTitleField<TFormValues extends FieldValues>({
    control,
    name,
    showLabel = true,
}: ILessonTitleFieldProps<TFormValues>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {showLabel && <span className="text-sm font-medium">Title</span>}
                    <Input {...field} value={field.value ?? ''} />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
