import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { detectLocale } from '@/shared/lib/i18n/detectLocale';

export default async function proxy(request: NextRequest) {
    const cookieStore = await cookies();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const { pathname } = request.nextUrl;
    const acceptLanguage = request.headers.get('accept-language') ?? undefined;
    const locale = detectLocale(acceptLanguage);

    cookieStore.set('lang', locale, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    const url = request.nextUrl.clone();

    url.pathname = `/${locale}${pathname}`;

    return NextResponse.rewrite(url);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
};
