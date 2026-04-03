import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCourseService } from '@/services/services';
import { courseSchema, patchCourseSchema } from '@/shared/lib/form/course-form-schema';

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

        const body: unknown = await req.json();

        const parsed = courseSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
        }

        const { title, description, price, currencyId } = parsed.data;

        const course = await getCourseService().create({
            title,
            description: description ?? null,
            price,
            currencyId,
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

        const body: unknown = await req.json();

        const parsed = patchCourseSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
        }

        const { id, ...patch } = parsed.data;

        const updated = await getCourseService().update(id, patch);

        return NextResponse.json(updated);
    } catch (err) {
        console.error(err);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
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

    const result = await getCourseService().delete({ id });

    return Response.json(result);
}
