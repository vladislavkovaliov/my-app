import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get('email');

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
