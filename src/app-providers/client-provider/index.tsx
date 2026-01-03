'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NextAuthProvider } from '../session-provider';

const queryClient = new QueryClient();

export function ClientProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NextAuthProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </NextAuthProvider>
    );
}
