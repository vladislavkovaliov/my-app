import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get('email') ?? 'no-email@gmail.com';

        const user = await prisma.user.findUnique({
            where: { emailId: email },
        });

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const payments = await prisma.payment.findMany({
            where: { userId: user.id },
            include: {
                course: true,
                lessonPayments: { include: { lesson: true } },
                currency: true,
            },
        });

        const total = await prisma.payment.count({
            where: { userId: user.id },
        });

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

    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();

    const payment = await prisma.payment.create({
        data: {
            amount: body.amount,
            type: 'PACKAGE',
            status: 'PENDING',
            paidAt: new Date(body.paidAt),
            user: { connect: { id: session.user.id } },
            course: { connect: { id: body.courseId } },
            currency: { connect: { id: body.currencyId } },
        },
    });

    return Response.json(payment);
}
