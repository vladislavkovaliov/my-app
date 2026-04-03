# QWEN.md — Project Context

## Project Overview

**my-app** is a Next.js 16 web application for managing an online education platform. It provides features for managing **courses**, **lessons**, **payments**, **currencies**, and **user enrollments**. The app includes a data-grid UI with inline editing, sheet-based forms for creating records, and a calendar view for lessons.

### Tech Stack

| Category       | Technology                             |
| -------------- | -------------------------------------- |
| Framework      | Next.js 16 (App Router)                |
| Language       | TypeScript 5.9                         |
| UI             | React 19, Radix UI, shadcn/ui          |
| Styling        | Tailwind CSS 4                         |
| State/Data     | TanStack React Query, React Hook Form  |
| Validation     | Zod                                    |
| ORM            | Prisma 6 (MongoDB)                     |
| Auth           | NextAuth.js v4                         |
| i18n           | Custom dictionary-based (en-US, ru-RU) |
| Calendar       | FullCalendar                           |
| Data Grid      | TanStack Table                         |
| Linting/Format | ESLint 9, Prettier                     |
| Git Hooks      | Husky, lint-staged, commitizen         |

### Architecture

The project follows **Feature-Sliced Design (FSD)** principles for directory structure:

```
src/
├── app/              — Next.js App Router (routes, layouts, API)
├── app-providers/    — React context providers (auth, i18n, sheet states, etc.)
├── components/       — Reusable UI components (shadcn/ui)
├── entities/         — Business entities (models, API clients, form fields)
├── features/         — User-facing features (grids, sheet forms, calendar)
├── generated/        — Auto-generated Prisma client
├── lib/              — Utilities (prisma instance, utils)
├── services/         — Domain services (CRUD operations via Prisma)
├── shared/           — Shared hooks, form schemas, helpers
└── widgets/          — Composite components (header, data-grid, calendar)
```

## Database Schema (MongoDB via Prisma)

Key entities:

- **User** — platform users
- **Course** — courses with title, description, price, currency
- **Lesson** — lessons linked to courses with startTime/endTime
- **Enrollment** — user-course enrollment mapping
- **Payment** — payment records with status (PENDING/PAID/CANCELED), type (COURSE/PACKAGE/SINGLE)
- **LessonPayment** — lesson-level payment tracking
- **Currency** — supported currencies (BYN, USD, EUR, etc.)
- **Account** — NextAuth OAuth accounts

## Building and Running

### Prerequisites

- Node.js > 20
- npm > 10
- MongoDB instance (configured via `DATABASE_URL` in `.env`)

### Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint and fix
npm run lint

# Format code
npm run prettier

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### Environment Variables

Required in `.env`:

- `DATABASE_URL` — MongoDB connection string
- `NEXTAUTH_URL` — base URL for NextAuth
- `NEXTAUTH_SECRET` — secret for NextAuth session encryption

## Development Conventions

### Code Style

- **TypeScript**: Strict mode enabled, `noEmit: true`, path aliases (`@/*` → `./src/*`)
- **ESLint**: `eslint-config-next`, `eslint-config-prettier`, `eslint-plugin-perfectionist`
- **Prettier**: Default config, runs on lint-staged for `*.{ts,tsx}`
- **Lint-staged**: Auto-fixes lint and formats on pre-commit

### Git Workflow

- **Husky**: Pre-commit hooks via `lint-staged`
- **Commitizen**: Conventional commits via `cz-adapter`
- **Semantic Release**: Configured via `.releaserc.yaml` for automated changelog/versioning

### Form Patterns

- **Validation**: Zod schemas in `src/shared/lib/form/`
- **Forms**: React Hook Form with `@hookform/resolvers/zod`
- **Pattern**: Separate schemas for form (`z.date()`) vs API (`z.coerce.date()`) to handle JSON string→Date coercion

### Data Grid Pattern

- Uses TanStack Table with inline edit mode
- `usePaymentDataGridMode` provider manages VIEW/EDIT state
- Click row → edit mode with form fields inline
- Save triggers mutation → invalidates query cache

### i18n

- Dictionary-based approach: JSON files in `src/app/[lang]/dictionaries/`
- Supported locales: `en-US`, `ru-RU`
- `I18nProvider` context provides `dict` and `lang`

### API Routes

- RESTful under `src/app/api/`
- Zod validation for POST/PATCH bodies
- Session check via `getServerSession(authOptions)`
- Services layer handles Prisma queries

## Key Pages

| Route         | Description                    |
| ------------- | ------------------------------ |
| `/payments`   | Payments grid + create sheet   |
| `/courses`    | Courses grid + create sheet    |
| `/lessons`    | Lessons grid + create sheet    |
| `/currencies` | Currencies grid + create sheet |
| `/calendar`   | Lesson calendar view           |

## Notable Patterns

1. **Sheet Create Pattern**: Each entity has a `*-sheet-create-provider` context, a sheet component, a form component, and a wrapper component that ties them together.

2. **Service Layer**: Each entity has a service class extending `PrismaService` with methods like `create`, `update`, `findMany`, `findManyAndTotal`, `delete`.

3. **API Validation**: POST uses the form schema; PATCH uses a `patch*Schema` with optional fields + required `id` + refine that at least one field is provided.

4. **Date Handling**: Form schemas use `z.date()` for JS Date objects; API schemas use `z.coerce.date()` to accept ISO strings from JSON payloads.
