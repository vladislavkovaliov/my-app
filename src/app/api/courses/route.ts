import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCourseService } from '@/services';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest) {
    try {
        const courses = await prisma.course.findMany({
            include: { currency: true },
            orderBy: { title: 'asc' },
        });

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

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        const course = await getCourseService().create({
            title: body.title,
            description: body.description,
            price: body.price,
            currencyId: body.currencyId,
        });

        return Response.json(course);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
