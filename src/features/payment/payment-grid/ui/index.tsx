import { useMemo } from 'react';
import { DataGrid } from '@/widgets/data-grid';

import { getColumns } from './colums';
import { useI18n } from '@/app-providers/i-18n-provider';
import { usePayments } from '@/features/payment/payment-grid/hooks/use-payments';

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
