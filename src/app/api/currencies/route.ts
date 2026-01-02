import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_: NextRequest) {
    try {
        const currencies = await prisma.currency.findMany();

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
