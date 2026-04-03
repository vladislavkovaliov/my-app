import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCourseService } from '@/services';

export async function GET(_: NextRequest) {
    try {
        const { courses, total } = await getCourseService().findManyAndTotal();

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

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        const { id, ...rest } = body as { id?: string } & Record<string, unknown>;

        if (!id) {
            return NextResponse.json({ error: 'course id is required' }, { status: 400 });
        }

        const updated = await getCourseService().update(id, {
            ...(typeof rest.title === 'string' && { title: rest.title }),
            ...(rest.description === null || typeof rest.description === 'string'
                ? { description: rest.description as string | null }
                : {}),
            ...(typeof rest.price === 'number' && { price: rest.price }),
            ...(typeof rest.currencyId === 'string' && { currencyId: rest.currencyId }),
        });

        return NextResponse.json(updated);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
