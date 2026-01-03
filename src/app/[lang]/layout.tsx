import { notFound } from 'next/navigation';

import { I18nProvider } from '@/app-providers';
import { AppHeader } from '@/widgets/app-header';

import { getDictionary, hasLocale } from './dictionaries';

export default async function LangLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}>) {
    const { lang } = await params;

    if (!hasLocale(lang)) notFound();

    const dict = await getDictionary(lang);

    return (
        <I18nProvider lang={lang} dict={dict}>
            <AppHeader />
            <main>{children}</main>
        </I18nProvider>
    );
}
