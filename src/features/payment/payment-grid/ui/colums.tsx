import { CellContext } from '@tanstack/table-core';
import { format } from 'date-fns';

import { Dict } from '@/app/[lang]/i18n';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PaymentGridDropdownMenu from '@/features/payment/payment-grid/ui/payment-grid-dropdown-menu';
import { Payment as IPayment } from '@/generated/prisma';

export function getColumns({ dict }: { dict: Dict }) {
    const _dict = dict.features['payment-grid'];

    return [
        {
            accessorKey: 'id',
            header: _dict.id,
            cell: (info: CellContext<IPayment, unknown>) => {
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
            cell: (info: CellContext<IPayment, unknown>) => (
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
            cell: (info: CellContext<IPayment, unknown>) => (
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
            cell: (info: CellContext<IPayment, unknown>) => (
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
            cell: (info: CellContext<IPayment, unknown>) => (
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
            cell: (info: CellContext<IPayment, unknown>) => (
                <span className="font-medium">{info.getValue() as string}</span>
            ),
            size: 150,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            id: 'actions',
            header: '',
            enableSorting: false,
            enableHiding: false,
            cell: (info: CellContext<IPayment, unknown>) => {
                return (
                    <div className="flex justify-end">
                        <PaymentGridDropdownMenu payment={info.row.original} />
                    </div>
                );
            },
        },
    ];
}
