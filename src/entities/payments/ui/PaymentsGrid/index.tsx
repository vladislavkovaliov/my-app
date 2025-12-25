import { useMemo } from 'react';
import { DataGrid } from '@/widgets/DataGrid';

import { getColumns } from './colums';
import { useI18n } from '@/AppProviders/I18nProvider';
import { usePayments } from '@/entities/payments/hooks/usePayments';

export interface IPaymentsGridProps {}

export function PaymentsGrid(_: IPaymentsGridProps) {
    const { data, isPending } = usePayments();

    const { dict } = useI18n();

    const columns = getColumns({ dict });

    const _data = useMemo(() => {
        return data ?? { data: [], total: 0 };
    }, [data]);

    return (
        <div className="p-4">
            <DataGrid columns={columns} isLoading={isPending} {..._data} />
        </div>
    );
}
