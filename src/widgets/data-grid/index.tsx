import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { useI18n } from '@/app-providers/i-18n-provider';
import { DataGridContainer, DataGrid as _DataGrid } from '@/components/ui/data-grid';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { IDataGridProps } from './types';

export function DataGrid<T extends { id: string }>({
    columns,
    data,
    isLoading,
    total,
}: IDataGridProps<T>) {
    const { dict } = useI18n();

    const _dict = dict.widgets['data-grid'];

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);

    const table = useReactTable({
        columns: columns,
        data: data,
        pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
        getRowId: (row: T) => row.id,
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <_DataGrid table={table} recordCount={data?.length || 0} isLoading={isLoading}>
            <div className="w-full space-y-2.5">
                <DataGridContainer>
                    <ScrollArea>
                        <DataGridTable />
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </DataGridContainer>
                <DataGridPagination
                    rowsPerPageLabel={_dict['rows-per-page-label']}
                    info={`${_dict.info} ${total}`}
                />
            </div>
        </_DataGrid>
    );
}
