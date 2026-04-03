import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCurrencyService } from '@/services/services';
import { currencySchema, patchCurrencySchema } from '@/shared/lib/form/currency-form-schema';

export async function GET(_: NextRequest) {
    try {
        const { currencies, total } = await getCurrencyService().findManyAndTotal();

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

        const body: unknown = await req.json();

        const parsed = currencySchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
        }

        const { code, name, symbol, isActive } = parsed.data;

        const currency = await getCurrencyService().create({
            code: code.trim(),
            name: name.trim(),
            symbol: symbol != null && symbol.trim() !== '' ? symbol.trim() : null,
            isActive,
        });

        return Response.json(currency);
    } catch (err) {
        console.error(err);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body: unknown = await req.json();

        const parsed = patchCurrencySchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
        }

        const { id, ...patch } = parsed.data;

        const updated = await getCurrencyService().update(id, patch);

        return NextResponse.json(updated);
    } catch (err) {
        console.error(err);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: unknown = await req.json();
    const { id } = body as { id?: string };

    if (!id) {
        return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const { canDelete, courseCount, paymentCount } = await getCurrencyService().canDelete({ id });

    if (!canDelete) {
        const parts = [];

        if (courseCount > 0) {
            parts.push(`${courseCount} course(s)`);
        }
        if (paymentCount > 0) {
            parts.push(`${paymentCount} payment(s)`);
        }

        return NextResponse.json(
            { error: `Cannot delete currency. It is referenced by: ${parts.join(', ')}.` },
            { status: 400 },
        );
    }

    const result = await getCurrencyService().delete({ id });

    return Response.json(result);
}
