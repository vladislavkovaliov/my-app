import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { CellContext } from '@tanstack/table-core';
import { Payment } from '@/entities/payments/model/payment';
import { Dict } from '@/app/[lang]/i18n';

export function getColumns({ dict }: { dict: Dict }) {
    const _dict = dict.features['payment-grid'];

    return [
        {
            accessorKey: 'id',
            header: _dict.id,
            cell: (info: CellContext<Payment, unknown>) => {
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
            accessorKey: 'amount',
            header: _dict.amount,
            cell: (info: CellContext<Payment, unknown>) => (
                <span className="font-medium">{info.getValue() as string}</span>
            ),
            size: 80,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'status',
            header: _dict.status,
            cell: (info: CellContext<Payment, unknown>) => (
                <span className="font-medium">{info.getValue() as string}</span>
            ),
            size: 80,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'type',
            header: _dict.type,
            cell: (info: CellContext<Payment, unknown>) => (
                <span className="font-medium">{info.getValue() as string}</span>
            ),
            size: 80,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'paidAt',
            header: _dict.paidAt,
            cell: (info: CellContext<Payment, unknown>) => (
                <span className="font-medium">
                    {format(new Date(info.getValue() as string), 'yyyy-MM-dd') as string}
                </span>
            ),
            size: 100,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'comment',
            header: _dict.comment,
            cell: (info: CellContext<Payment, unknown>) => (
                <span className="font-medium">{info.getValue() as string}</span>
            ),
            size: 150,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
    ];
}
