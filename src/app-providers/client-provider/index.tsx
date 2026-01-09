'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PaymentDataGridModeProvider } from '@/app-providers/payment-data-grid-mode';
import { PaymentSheetDatePickerDialogProvider } from '@/app-providers/payment-sheet-datepicker-dialog';

import { PaymentSheetCreateProvider } from '../payment-sheet-create-provider';
import { NextAuthProvider } from '../session-provider';

const queryClient = new QueryClient();

export function ClientProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NextAuthProvider>
            <QueryClientProvider client={queryClient}>
                <PaymentSheetCreateProvider>
                    <PaymentSheetDatePickerDialogProvider>
                        <PaymentDataGridModeProvider>{children}</PaymentDataGridModeProvider>
                    </PaymentSheetDatePickerDialogProvider>
                </PaymentSheetCreateProvider>
            </QueryClientProvider>
        </NextAuthProvider>
    );
}
