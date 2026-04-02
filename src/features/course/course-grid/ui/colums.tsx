import { CellContext } from '@tanstack/table-core';

import { Dict } from '@/app/[lang]/i18n';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CourseRow } from '@/entities/courses/api/get-courses-api';

export function getColumns({ dict }: { dict: Dict }) {
    const _dict = dict.features['course-grid'];

    return [
        {
            accessorKey: 'id',
            header: _dict.id,
            cell: (info: CellContext<CourseRow, unknown>) => {
                const content = info.getValue() as string;
                const contentShort = content.slice(0, 5);

                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="font-medium">{contentShort}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{content}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            },
            size: 80,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'title',
            header: _dict.title,
            cell: (info: CellContext<CourseRow, unknown>) => (
                <span className="font-medium">{info.getValue() as string}</span>
            ),
            size: 200,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'description',
            header: _dict.description,
            cell: (info: CellContext<CourseRow, unknown>) => {
                const value = info.getValue() as string | null;
                return <span className="font-medium text-muted-foreground">{value ?? '—'}</span>;
            },
            size: 240,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'price',
            header: _dict.price,
            cell: (info: CellContext<CourseRow, unknown>) => (
                <span className="font-medium">{info.getValue() as number}</span>
            ),
            size: 100,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            id: 'currency',
            accessorFn: (row: CourseRow) => row.currency?.code ?? '',
            header: _dict.currency,
            cell: (info: CellContext<CourseRow, unknown>) => {
                const row = info.row.original;
                const code = row.currency?.code ?? '—';

                return (
                    <div className="flex">
                        <span className="font-medium">{code}</span>
                    </div>
                );
            },
            size: 100,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
    ];
}
