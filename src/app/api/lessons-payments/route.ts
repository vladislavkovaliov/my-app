import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getLessonPaymentService } from '@/services/services';
import {
    lessonPaymentSchema,
    patchLessonPaymentSchema,
} from '@/shared/lib/form/lesson-payment-form-schema';

export async function GET() {
    try {
        const { data, total } = await getLessonPaymentService().findManyAndTotal();

        return NextResponse.json({
            data,
            total,
        });
    } catch (err) {
        console.error(err);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: unknown = await req.json();
    const parsed = lessonPaymentSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const result = await getLessonPaymentService().create(parsed.data, {
        id: session.user.id!,
    });

    return Response.json(result);
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: unknown = await req.json();
    const parsed = patchLessonPaymentSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { id, ...patch } = parsed.data;
    const result = await getLessonPaymentService().update({ id }, patch);

    return Response.json(result);
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

    const result = await getLessonPaymentService().delete({ id });

    return Response.json(result);
}
