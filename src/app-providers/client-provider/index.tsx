'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
                <PaymentSheetCreateProvider>{children}</PaymentSheetCreateProvider>
            </QueryClientProvider>
        </NextAuthProvider>
    );
}
