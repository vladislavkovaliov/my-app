'use client';

import { NextAuthProvider } from '@/AppProviders/SessionProvider';

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
