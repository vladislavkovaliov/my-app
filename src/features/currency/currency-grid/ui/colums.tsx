import { CellContext } from '@tanstack/table-core';
import { Control } from 'react-hook-form';

import { Mode } from '@/app-providers/payment-data-grid-mode/payment-data-grid-mode';
import { Dict } from '@/app/[lang]/i18n';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CurrencyCodeField } from '@/entities/currencies/ui/form-fields/currency-code-field';
import { CurrencyNameField } from '@/entities/currencies/ui/form-fields/currency-name-field';
import { CurrencySymbolField } from '@/entities/currencies/ui/form-fields/currency-symbol-field';
import CurrencyGridDropdownMenu from '@/features/currency/currency-grid/ui/currency-grid-dropdown-menu';
import { Currency as ICurrency } from '@/generated/prisma';
import { CurrencyFormValues } from '@/shared/lib/form/currency-form-schema';

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
    control: Control<CurrencyFormValues>;
    onCancelEditMode: () => void;
    onSave: () => void;
}) {
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
            cell: (info: CellContext<ICurrency, unknown>) => {
                return (
                    <div className="flex">
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <span className="font-medium">{info.getValue() as string}</span>
                        ) : null}
                        {mode === Mode.EDIT && info.row.id === activeRowId ? (
                            <CurrencyCodeField
                                control={control}
                                name="code"
                                showLabel={false}
                                showDescription={false}
                            />
                        ) : null}
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
        {
            accessorKey: 'name',
            header: _dict.name,
            cell: (info: CellContext<ICurrency, unknown>) => {
                return (
                    <div className="flex">
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <span className="font-medium">{info.getValue() as string}</span>
                        ) : null}
                        {mode === Mode.EDIT && info.row.id === activeRowId ? (
                            <CurrencyNameField
                                control={control}
                                name="name"
                                showLabel={false}
                                showDescription={false}
                            />
                        ) : null}
                    </div>
                );
            },
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

                return (
                    <div className="flex">
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <span className="font-medium text-muted-foreground">
                                {value ?? '—'}
                            </span>
                        ) : null}
                        {mode === Mode.EDIT && info.row.id === activeRowId ? (
                            <CurrencySymbolField
                                control={control}
                                name="symbol"
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
        {
            id: 'actions',
            header: '',
            enableSorting: false,
            enableHiding: false,
            cell: (info: CellContext<ICurrency, unknown>) => {
                return (
                    <div className="flex justify-end space-x-2">
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <CurrencyGridDropdownMenu currency={info.row.original} />
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
