'use client';

import { NextAuthProvider } from '../session-provider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
