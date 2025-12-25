'use client';

import { createContext, useContext, ReactNode } from 'react';

import { Dict } from '@/app/[lang]/i18n';

type I18nContextType = {
    lang: string;
    dict: Dict;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
    lang,
    dict,
    children,
}: {
    lang: string;
    dict: I18nContextType['dict'];
    children: ReactNode;
}) {
    return <I18nContext.Provider value={{ lang, dict }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) throw new Error('useI18n must be used within I18nProvider');
    return context;
};
