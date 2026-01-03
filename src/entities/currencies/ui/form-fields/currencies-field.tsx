'use client';

import * as React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { Button, ButtonArrow } from '@/components/ui/button';
import {
    Command,
    CommandCheck,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Currency as ICurrency } from '@/generated/prisma';
import { cn } from '@/lib/utils';

export interface ICoursesFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    currencies: {
        value: ICurrency['id'];
        label: ICurrency['name'];
    }[];
}

export function CurrenciesField<TFormValues extends FieldValues>({
    control,
    name,
    currencies,
}: ICoursesFieldProps<TFormValues>) {
    const [open, setOpen] = React.useState(false);
    const [_, setValue] = React.useState('');

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                mode="input"
                                placeholder={!field.value}
                                aria-expanded={open}
                                className="w-full"
                            >
                                <span className={cn('truncate')}>
                                    {field.value
                                        ? currencies.find(
                                              (currency) => currency.value === field.value,
                                          )?.label
                                        : 'Select a currency...'}
                                </span>
                                <ButtonArrow />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
                            <Command>
                                <CommandInput placeholder="Search course..." />
                                <CommandList>
                                    <CommandEmpty>No course found.</CommandEmpty>
                                    <CommandGroup>
                                        {currencies.map((currency) => (
                                            <CommandItem
                                                key={currency.value}
                                                value={currency.value}
                                                onSelect={() => {
                                                    setValue(currency.value);
                                                    field.onChange(currency.value);
                                                    setOpen(false);
                                                }}
                                            >
                                                <span className="truncate">{currency.label}</span>
                                                {field.value === currency.value && <CommandCheck />}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription>Select your preferred currency.</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
