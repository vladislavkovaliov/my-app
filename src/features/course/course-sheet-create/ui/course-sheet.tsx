import { useDirection } from '@radix-ui/react-direction';
import * as React from 'react';

import { useI18n } from '@/app-providers/i-18n-provider';
import {
    Sheet,
    SheetBody,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

export interface ICourseSheetCreateProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CourseSheet({ children, open, onOpenChange }: ICourseSheetCreateProps) {
    const direction = useDirection();

    const { dict } = useI18n();

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent dir={direction}>
                <SheetHeader>
                    <SheetTitle>{dict.features.course.sheet.title}</SheetTitle>
                    <SheetDescription>{dict.features.course.sheet.description}</SheetDescription>
                </SheetHeader>
                <SheetBody>{children}</SheetBody>
            </SheetContent>
        </Sheet>
    );
}
