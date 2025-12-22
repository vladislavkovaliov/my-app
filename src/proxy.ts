import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { detectLocale } from '@/shared/lib/i18n/detectLocale';
import { getToken } from 'next-auth/jwt';

const LOCALES = ['en-US', 'ru-RU'];

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const cookieStore = await cookies();

    const acceptLanguage = request.headers.get('accept-language') ?? undefined;
    const localeFromHeader = detectLocale(acceptLanguage);
    const locale = cookieStore.get('locale')?.value ?? localeFromHeader ?? 'en-US';

    const token = await getToken({ req: request });

    if (!token) {
        const loginUrl = request.nextUrl.clone();

        loginUrl.pathname = `/${locale}/auth/signin`;

        return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();

    response.cookies.set('locale', locale, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
    });

    const hasLocale = LOCALES.some((locale) => {
        return pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);
    });

    if (hasLocale) {
        return response;
    }

    const url = request.nextUrl.clone();

    url.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(url);
}

export const config = {
    matcher: ['/((?!_next|api|en-US/auth|ru-RU/auth).*)'],
};
