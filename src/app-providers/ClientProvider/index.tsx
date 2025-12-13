'use client';

import { AppHeader } from '@/widgets/app-header/ui';

export function ClientProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AppHeader />
            <main>{children}</main>
        </>
    );
}
