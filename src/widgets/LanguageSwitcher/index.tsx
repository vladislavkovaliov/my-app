'use client';

import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (locale: string) => {
        const segments = pathname.split('/');

        segments[1] = locale;

        router.push(segments.join('/'));
    };

    return (
        <>
            <button onClick={() => switchLocale('en-US')}>EN</button>
            <button onClick={() => switchLocale('ru-RU')}>RU</button>
        </>
    );
}
