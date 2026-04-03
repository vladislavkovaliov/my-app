import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getPaymentService, getUserService } from '@/services/services';
import { paymentSchema, patchPaymentSchema } from '@/shared/lib/form/payment-form-schema';

export async function GET(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get('email') ?? 'no-email@gmail.com';

        const user = await getUserService().findUnique({
            email: email,
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const dbUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailId: user.emailId,
        };

        const { payments, total } = await getPaymentService().findManyAndTotal(dbUser);

        return NextResponse.json({
            data: payments,
            total: total,
        });
    } catch (err) {
        console.error(err);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: unknown = await req.json();
    const parsed = paymentSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const result = await getPaymentService().create(parsed.data, {
        id: session.user.id!,
    });

    return Response.json(result);
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: unknown = await req.json();
    const parsed = patchPaymentSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { id, ...patch } = parsed.data;
    const result = await getPaymentService().update({ id }, patch);

    return Response.json(result);
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

    const result = await getPaymentService().delete({ id }, { id: session.user.id! });

    return Response.json(result);
}
