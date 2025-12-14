import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en-US', 'ru-RU'] as const;
const defaultLocale = 'en-US';

export function detectLocale(acceptLanguageHeader?: string) {
    const headers = {
        'accept-language': acceptLanguageHeader ?? defaultLocale,
    };

    const languages = new Negotiator({ headers }).languages();

    return match(languages, locales, defaultLocale);
}
