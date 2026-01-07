import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ALLOWED_STATUSES, PaymentStatus } from '@/entities/payments/model/payment';
import { getPaymentService, getUserService } from '@/services';

export async function GET(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get('email') ?? 'no-email@gmail.com';

        const user = await getUserService().findUnique({
            email: email,
        });

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

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
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        const payment = await getPaymentService().create(
            {
                amount: body.amount,
                paidAt: new Date(body.paidAt),
                courseId: body.courseId,
                currencyId: body.currencyId,
            },
            {
                id: session.user.id!,
            },
        );

        return Response.json(payment);
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

        const body = await req.json();

        const { paymentId, status } = body as {
            paymentId?: string;
            status?: PaymentStatus;
        };

        if (!paymentId || !status) {
            return NextResponse.json(
                { error: 'paymentId and status are required' },
                { status: 400 },
            );
        }

        if (!ALLOWED_STATUSES.includes(status)) {
            return NextResponse.json({ error: 'Invalid payment status' }, { status: 400 });
        }

        const payment = await getPaymentService().findFirst(
            {
                id: paymentId,
            },
            {
                id: session.user.id!,
            },
        );

        if (!payment) {
            return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
        }

        const updatedPayment = await getPaymentService().update(
            {
                id: paymentId,
            },
            { status: status },
        );

        return NextResponse.json(updatedPayment);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
