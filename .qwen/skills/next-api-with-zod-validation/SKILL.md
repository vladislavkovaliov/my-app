---
name: next-api-with-zod-validation
description: Generate Next.js API routes with Zod validation
---

# API Zod Validation

Validate Next.js API route bodies using Zod `safeParse`.

## Schema Convention

Define schemas in `src/shared/lib/form/<entity>-form-schema.ts`:

```ts
// Create schema — all fields required
export const entitySchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().positive(),
});

// Patch schema — optional fields + required id + at least one field
export const patchEntitySchema = z
    .object({
        id: z.string().min(1),
        name: entitySchema.shape.name.optional(),
        price: entitySchema.shape.price.optional(),
    })
    .strict()
    .refine(
        (data) => {
            const { id, ...rest } = data;
            return Object.values(rest).some((v) => v !== undefined);
        },
        { message: 'At least one field is required' },
    );
```

> Use `z.coerce.date()` for date fields so ISO strings from JSON are accepted.

## API Route Pattern

### POST — Create

```ts
import { entitySchema } from '@/shared/lib/form/entity-form-schema';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body: unknown = await req.json();
    const parsed = entitySchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const result = await getService().create(parsed.data);
    return Response.json(result);
}
```

### PATCH — Update

```ts
import { patchEntitySchema } from '@/shared/lib/form/entity-form-schema';

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body: unknown = await req.json();
    const parsed = patchEntitySchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { id, ...patch } = parsed.data;
    const result = await getService().update(id, patch);
    return Response.json(result);
}
```

### DELETE

```ts
export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body: unknown = await req.json();
    const { id } = body as { id?: string };
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const result = await getService().delete(id);
    return Response.json(result);
}
```

## Rules

| Rule            | Detail                                                          |
| --------------- | --------------------------------------------------------------- |
| `body: unknown` | Always type the parsed variable as `unknown` before `safeParse` |
| Error response  | `{ error: parsed.error.flatten() }` with status `400`           |
| PATCH refine    | Must have at least one non-`id` field defined                   |
| `.strict()`     | Rejects unknown keys in PATCH body                              |
| Service layer   | Pass validated data to service methods                          |
