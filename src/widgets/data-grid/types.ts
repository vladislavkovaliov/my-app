import { ColumnDef } from '@tanstack/react-table';

export type IDataGridProps<T> = {
    columns: ColumnDef<T>[];
    data: T[];
    isLoading: boolean;
    total: number;
};
