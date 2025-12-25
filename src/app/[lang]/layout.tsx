import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';
import { I18nProvider } from '@/AppProviders';
import { AppHeader } from '@/widgets/AppHeader';

export default async function LangLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { lang: string };
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
