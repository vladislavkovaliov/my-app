import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_: NextRequest) {
    try {
        const courses = await prisma.course.findMany();

        const total = await prisma.course.count();

        return NextResponse.json({
            data: courses,
            total: total,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
