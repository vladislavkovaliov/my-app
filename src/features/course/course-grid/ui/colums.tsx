import { CellContext } from '@tanstack/table-core';
import { Control } from 'react-hook-form';

import { Mode } from '@/app-providers/payment-data-grid-mode';
import { Dict } from '@/app/[lang]/i18n';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CurrenciesField } from '@/entities/currencies/ui/form-fields/currencies-field';
import { CourseRow } from '@/entities/courses/api/get-courses-api';
import { CourseDescriptionField } from '@/entities/courses/ui/form-fields/course-description-field';
import { CoursePriceField } from '@/entities/courses/ui/form-fields/course-price-field';
import { CourseTitleField } from '@/entities/courses/ui/form-fields/course-title-field';
import CourseGridDropdownMenu from '@/features/course/course-grid/ui/course-grid-dropdown-menu';
import { Currency as ICurrency } from '@/generated/prisma';
import { CourseFormValues } from '@/shared/lib/form/course-form-schema';

export function getColumns({
    dict,
    mode,
    activeRowId,
    control,
    onCancelEditMode,
    onSave,
    currencies,
}: {
    dict: Dict;
    mode: Mode;
    activeRowId: string | null;
    control: Control<CourseFormValues>;
    onCancelEditMode: () => void;
    onSave: () => void;
    currencies: {
        value: ICurrency['id'];
        label: ICurrency['name'];
    }[];
}) {
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
                <div className="flex min-w-[120px]">
                    {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                        <span className="font-medium">{info.getValue() as string}</span>
                    ) : null}
                    {mode === Mode.EDIT && info.row.id === activeRowId ? (
                        <CourseTitleField
                            control={control}
                            name="title"
                            showLabel={false}
                            showDescription={false}
                        />
                    ) : null}
                </div>
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
                return (
                    <div className="flex min-w-[140px]">
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <span className="font-medium text-muted-foreground">
                                {value ?? '—'}
                            </span>
                        ) : null}
                        {mode === Mode.EDIT && info.row.id === activeRowId ? (
                            <CourseDescriptionField
                                control={control}
                                name="description"
                                showLabel={false}
                                showDescription={false}
                            />
                        ) : null}
                    </div>
                );
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
                <div className="flex min-w-[72px]">
                    {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                        <span className="font-medium">{info.getValue() as number}</span>
                    ) : null}
                    {mode === Mode.EDIT && info.row.id === activeRowId ? (
                        <CoursePriceField
                            control={control}
                            name="price"
                            showLabel={false}
                            showDescription={false}
                        />
                    ) : null}
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
            id: 'currency',
            accessorFn: (row: CourseRow) => row.currency?.code ?? '',
            header: _dict.currency,
            cell: (info: CellContext<CourseRow, unknown>) => {
                const row = info.row.original;
                const code = row.currency?.code ?? '—';

                return (
                    <div className="flex min-w-[100px]">
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <span className="font-medium">{code}</span>
                        ) : null}
                        {mode === Mode.EDIT && info.row.id === activeRowId ? (
                            <CurrenciesField
                                control={control}
                                name="currencyId"
                                currencies={currencies}
                                showLabel={false}
                                showDescription={false}
                            />
                        ) : null}
                    </div>
                );
            },
            size: 160,
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
            cell: (info: CellContext<CourseRow, unknown>) => {
                return (
                    <div className="flex justify-end space-x-2">
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <CourseGridDropdownMenu course={info.row.original} />
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
