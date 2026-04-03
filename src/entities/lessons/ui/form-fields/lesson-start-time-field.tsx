import { format } from 'date-fns';
import { X } from 'lucide-react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormField } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ILessonDateTimeFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    showLabel?: boolean;
    showDescription?: boolean;
    showResetIcon?: boolean;
    placeholder?: string;
}

export function LessonStartTimeField<TFormValues extends FieldValues>({
    control,
    name,
    showResetIcon = true,
}: ILessonDateTimeFieldProps<TFormValues>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative w-full">
                                <Button
                                    type="button"
                                    variant="outline"
                                    mode="input"
                                    placeholder={!field.value}
                                    className="w-full"
                                >
                                    {field.value ? (
                                        format(field.value, 'yyyy-MM-dd HH:mm')
                                    ) : (
                                        <span>Select start time...</span>
                                    )}
                                </Button>
                                {showResetIcon && field && (
                                    <Button
                                        type="button"
                                        variant="dim"
                                        size="sm"
                                        className="absolute top-1/2 -end-0 -translate-y-1/2"
                                        onClick={() => field.onChange(undefined)}
                                    >
                                        <X />
                                    </Button>
                                )}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value ?? undefined}
                                onSelect={field.onChange}
                                autoFocus
                            />
                        </PopoverContent>
                    </Popover>
                );
            }}
        />
    );
}
