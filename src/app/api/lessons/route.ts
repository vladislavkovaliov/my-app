import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getLessonService } from '@/services/services';
import { lessonApiSchema, patchLessonSchema } from '@/shared/lib/form/lesson-form-schema';

export async function GET(_: NextRequest) {
    try {
        const { lessons, total } = await getLessonService().findManyAndTotal();

        return NextResponse.json({
            data: lessons,
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

        const parsed = lessonApiSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
        }

        const { title, startTime, endTime, courseId } = parsed.data;

        const lesson = await getLessonService().create({
            title: title ?? null,
            startTime,
            endTime,
            courseId,
        });

        return Response.json(lesson);
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

        const parsed = patchLessonSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
        }

        const { id, ...patch } = parsed.data;

        const updated = await getLessonService().update(id, patch);

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

    const result = await getLessonService().delete({ id });

    return Response.json(result);
}
