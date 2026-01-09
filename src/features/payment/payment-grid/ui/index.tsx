import { useEffect, useMemo } from 'react';

import { useI18n } from '@/app-providers/i-18n-provider';
import { usePaymentDataGridMode } from '@/app-providers/payment-data-grid-mode';
import { Form } from '@/components/ui/form';
import { usePayments } from '@/features/payment/payment-grid/hooks/use-payments';
import { DataGrid } from '@/widgets/data-grid';

import { usePaymentForm } from '../../payment-sheet-create/hooks/use-payment-form';
import { useUpdatePayment } from '../../payment-sheet-create/hooks/use-update-payment';
import { PaymentFormValues } from '../../payment-sheet-create/model/schema';
import { getColumns } from './colums';

export interface IPaymentsGridProps {}

export function PaymentsGrid(_: IPaymentsGridProps) {
    const { data, isPending } = usePayments();

    const { mode, changeActiveRowId, activeRowId, resetActiveRowId } = usePaymentDataGridMode();

    const { dict } = useI18n();

    const form = usePaymentForm();

    const { mutateAsync } = useUpdatePayment();

    const _data = useMemo(() => {
        return data ?? { data: [], total: 0 };
    }, [data]);

    const editablePayment = useMemo(() => {
        if (!activeRowId) {
            return null;
        }

        return _data.data.find(({ id }) => {
            return id === activeRowId;
        });
    }, [activeRowId, _data]);

    useEffect(() => {
        if (editablePayment) {
            form.setValue('amount', editablePayment.amount);
            form.setValue('paidAt', new Date(editablePayment.paidAt));
            form.setValue('courseId', editablePayment.courseId);
            form.setValue('currencyId', editablePayment.currencyId);
        }
    }, [form, editablePayment]);

    const handleSubmitingFormCallback = async (values: PaymentFormValues) => {
        await mutateAsync({
            ...editablePayment,
            ...values,
        });

        resetActiveRowId();
    };
    const handleSubmitCallback = form.handleSubmit(handleSubmitingFormCallback, (errors) => {
        console.log(errors);
    });

    const handleSaveCallback = () => {
        console.log('handleSubmitCallback');
        handleSubmitCallback();
    };

    const columns = getColumns({
        dict: dict,
        mode: mode,
        activeRowId: activeRowId,
        control: form.control,
        onCancelEditMode: resetActiveRowId,
        onSave: handleSaveCallback,
    });

    return (
        <div className="p-4">
            <Form {...form}>
                <form>
                    <DataGrid
                        columns={columns}
                        isLoading={isPending}
                        onRowClick={changeActiveRowId}
                        {..._data}
                    />
                </form>
            </Form>
        </div>
    );
}
