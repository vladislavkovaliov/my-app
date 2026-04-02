import { CellContext } from '@tanstack/table-core';

import { Dict } from '@/app/[lang]/i18n';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Currency as ICurrency } from '@/generated/prisma';

export function getColumns({ dict }: { dict: Dict }) {
    const _dict = dict.features['currency-grid'];

    return [
        {
            accessorKey: 'id',
            header: _dict.id,
            cell: (info: CellContext<ICurrency, unknown>) => {
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
            accessorKey: 'code',
            header: _dict.code,
            cell: (info: CellContext<ICurrency, unknown>) => (
                <span className="font-medium">{info.getValue() as string}</span>
            ),
            size: 100,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'name',
            header: _dict.name,
            cell: (info: CellContext<ICurrency, unknown>) => (
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
            accessorKey: 'symbol',
            header: _dict.symbol,
            cell: (info: CellContext<ICurrency, unknown>) => {
                const value = info.getValue() as string | null;
                return <span className="font-medium text-muted-foreground">{value ?? '—'}</span>;
            },
            size: 80,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'isActive',
            header: _dict.isActive,
            cell: (info: CellContext<ICurrency, unknown>) => {
                const active = info.getValue() as boolean;
                return (
                    <span className="font-medium">{active ? _dict.activeYes : _dict.activeNo}</span>
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
