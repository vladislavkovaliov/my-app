import { CellContext } from '@tanstack/table-core';
import { format } from 'date-fns';
import { Control } from 'react-hook-form';

import { Mode } from '@/app-providers/payment-data-grid-mode';
import { Dict } from '@/app/[lang]/i18n';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PaymentAmountField } from '@/entities/payments/ui/form-fields/payment-amount-field';
import { PaymentPaidAtField } from '@/entities/payments/ui/form-fields/payment-paid-at-field';
import PaymentGridDropdownMenu from '@/features/payment/payment-grid/ui/payment-grid-dropdown-menu';
import { Payment as IPayment } from '@/generated/prisma';

import { PaymentFormValues } from '../../payment-sheet-create/model/schema';

export function getColumns({
    dict,
    mode,
    activeRowId,
    control,
    onCancelEditMode,
    onSave,
}: {
    dict: Dict;
    mode: Mode;
    activeRowId: string | null;
    control: Control<PaymentFormValues>;
    onCancelEditMode: () => void;
    onSave: () => void;
}) {
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
            cell: (info: CellContext<IPayment, unknown>) => {
                return (
                    <div className="flex">
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <span className="font-medium">{info.getValue() as string}</span>
                        ) : null}
                        {mode === Mode.EDIT && info.row.id === activeRowId ? (
                            <PaymentAmountField
                                control={control}
                                name="amount"
                                showLabel={false}
                                showDescription={false}
                            />
                        ) : null}
                    </div>
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
            accessorKey: 'status',
            header: _dict.status,
            cell: (info: CellContext<IPayment, unknown>) => (
                <div className="flex">
                    <span className="font-medium">{info.getValue() as string}</span>
                </div>
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
                <div className="flex">
                    <span className="font-medium">{info.getValue() as string}</span>
                </div>
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
                <div>
                    <span className="font-medium">
                        {mode === Mode.VIEW || info.row.id !== activeRowId
                            ? (format(new Date(info.getValue() as string), 'yyyy-MM-dd') as string)
                            : null}
                        {mode === Mode.EDIT && info.row.id === activeRowId ? (
                            <PaymentPaidAtField
                                control={control}
                                name="paidAt"
                                showLabel={false}
                                showDescription={false}
                            />
                        ) : null}
                    </span>
                </div>
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
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <PaymentGridDropdownMenu payment={info.row.original} />
                        ) : null}
                        {mode === Mode.EDIT && info.row.id === activeRowId ? (
                            <>
                                <Button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onCancelEditMode();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="button" onClick={onSave}>
                                    Save
                                </Button>
                            </>
                        ) : null}
                    </div>
                );
            },
        },
    ];
}
