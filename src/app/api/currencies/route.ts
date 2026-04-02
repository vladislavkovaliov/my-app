import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { getCurrencyService } from '@/services';

export async function GET(_: NextRequest) {
    try {
        const currencies = await prisma.currency.findMany({
            orderBy: { code: 'asc' },
        });

        const total = await prisma.currency.count();

        return NextResponse.json({
            data: currencies,
            total: total,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        const currency = await getCurrencyService().create({
            code: String(body.code ?? '').trim(),
            name: String(body.name ?? '').trim(),
            symbol:
                body.symbol != null && String(body.symbol).trim() !== ''
                    ? String(body.symbol).trim()
                    : null,
            isActive: Boolean(body.isActive),
        });

        return Response.json(currency);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
