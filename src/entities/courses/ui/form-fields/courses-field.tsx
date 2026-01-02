'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
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
import { Control, FieldValues, Path } from 'react-hook-form';
import { Course as ICourse } from '@/generated/prisma';

export interface ICoursesFieldProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    courses: {
        value: ICourse['id'];
        label: ICourse['title'];
    }[];
}

export function CoursesField<TFormValues extends FieldValues>({
    control,
    name,
    courses,
}: ICoursesFieldProps<TFormValues>) {
    const [open, setOpen] = React.useState(false);
    const [_, setValue] = React.useState('');

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Course</FormLabel>
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
                                        ? courses.find((course) => course.value === field.value)
                                              ?.label
                                        : 'Select a course...'}
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
                                        {courses.map((course) => (
                                            <CommandItem
                                                key={course.value}
                                                value={course.value}
                                                onSelect={() => {
                                                    setValue(course.value);
                                                    field.onChange(course.value);
                                                    setOpen(false);
                                                }}
                                            >
                                                <span className="truncate">{course.label}</span>
                                                {field.value === course.value && <CommandCheck />}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription>Select your preferred course.</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
