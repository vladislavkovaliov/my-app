import { useDirection } from '@radix-ui/react-direction';
import * as React from 'react';

import { useI18n } from '@/app-providers/i-18n-provider/i-18n-provider';
import {
    Sheet,
    SheetBody,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

export interface ICurrencySheetCreateProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CurrencySheet({ children, open, onOpenChange }: ICurrencySheetCreateProps) {
    const direction = useDirection();

    const { dict } = useI18n();

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent dir={direction}>
                <SheetHeader>
                    <SheetTitle>{dict.features.currency.sheet.title}</SheetTitle>
                    <SheetDescription>{dict.features.currency.sheet.description}</SheetDescription>
                </SheetHeader>
                <SheetBody>{children}</SheetBody>
            </SheetContent>
        </Sheet>
    );
}
