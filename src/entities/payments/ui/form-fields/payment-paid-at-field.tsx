import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import * as React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useI18n } from '@/app-providers/i-18n-provider';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormField } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface IPaymentPaidAtFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
}

export function PaymentPaidAtField<TFormValues extends FieldValues>({
    control,
    name,
}: IPaymentPaidAtFieldProps<TFormValues>) {
    const { dict } = useI18n();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative w-[250px]">
                                <Button
                                    type="button"
                                    variant="outline"
                                    mode="input"
                                    placeholder={!field.value}
                                    className="w-full"
                                >
                                    <CalendarIcon />
                                    {field.value ? (
                                        format(field.value, 'PPP')
                                    ) : (
                                        <span>
                                            {dict.entities['form-fields'].payment['paid-at'].label}
                                        </span>
                                    )}
                                </Button>
                                {field && (
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
