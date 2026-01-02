import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_: NextRequest) {
    try {
        const lessonsPayments = await prisma.lessonPayment.findMany({
            include: {
                lesson: {
                    include: {
                        course: {
                            include: {
                                currency: true,
                            },
                        },
                    },
                },
                payment: {
                    include: {
                        course: {
                            include: {
                                currency: true,
                            },
                        },
                        currency: true,
                    },
                },
            },
        });

        const total = await prisma.lessonPayment.count();

        return NextResponse.json({
            data: lessonsPayments,
            total: total,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
