'use client';

import { useMemo } from 'react';

import { useI18n } from '@/app-providers/i-18n-provider';
import { useCurrencies } from '@/features/currency/currency-grid/hooks/use-currencies';
import { DataGrid } from '@/widgets/data-grid';

import { getColumns } from './colums';

export interface ICurrenciesGridProps {}

export function CurrenciesGrid(_: ICurrenciesGridProps) {
    const { data, isPending } = useCurrencies();

    const { dict } = useI18n();

    const _data = useMemo(() => {
        return data ?? { data: [], total: 0 };
    }, [data]);

    const columns = getColumns({ dict });

    return <DataGrid columns={columns} isLoading={isPending} {..._data} />;
}
