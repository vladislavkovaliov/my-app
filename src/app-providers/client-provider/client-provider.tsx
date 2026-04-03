'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CourseSheetCreateProvider } from '@/app-providers/course-sheet-create-provider/course-sheet-create-provider';
import { CurrencySheetCreateProvider } from '@/app-providers/currency-sheet-create-provider/currency-sheet-create-provider';
import { PaymentDataGridModeProvider } from '@/app-providers/payment-data-grid-mode/payment-data-grid-mode';
import { PaymentSheetCreateProvider } from '@/app-providers/payment-sheet-create-provider/payment-sheet-create-provider';
import { PaymentSheetDatePickerDialogProvider } from '@/app-providers/payment-sheet-datepicker-dialog/payment-sheet-datepicker-dialog';
import { NextAuthProvider } from '@/app-providers/session-provider/session-provider';

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
                    <CourseSheetCreateProvider>
                        <CurrencySheetCreateProvider>
                            <PaymentSheetDatePickerDialogProvider>
                                <PaymentDataGridModeProvider>
                                    {children}
                                </PaymentDataGridModeProvider>
                            </PaymentSheetDatePickerDialogProvider>
                        </CurrencySheetCreateProvider>
                    </CourseSheetCreateProvider>
                </PaymentSheetCreateProvider>
            </QueryClientProvider>
        </NextAuthProvider>
    );
}
