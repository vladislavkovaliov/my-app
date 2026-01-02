import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest) {
    try {
        const lessons = await prisma.lesson.findMany({
            include: {
                course: {
                    include: {
                        currency: true,
                    },
                },
            },
        });

        const total = await prisma.lesson.count();

        return NextResponse.json({
            data: lessons,
            total: total,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
