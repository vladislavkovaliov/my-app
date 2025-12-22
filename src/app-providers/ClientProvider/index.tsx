'use client';

import { NextAuthProvider } from '@/app-providers/SessionProvider';

export function ClientProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <NextAuthProvider>{children}</NextAuthProvider>;
}
