'use client';

import { useEffect, useMemo } from 'react';

import { useI18n } from '@/app-providers/i-18n-provider/i-18n-provider';
import { usePaymentDataGridMode } from '@/app-providers/payment-data-grid-mode/payment-data-grid-mode';
import { Form } from '@/components/ui/form';
import { useCurrencies } from '@/features/currency/currency-grid/hooks/use-currencies';
import { useCurrencyForm } from '@/shared/hooks/use-currency-form';
import { useUpdateCurrency } from '@/shared/hooks/use-update-currency';
import { CurrencyFormValues } from '@/shared/lib/form/currency-form-schema';
import { DataGrid } from '@/widgets/data-grid/data-grid';

import { getColumns } from './colums';

export interface ICurrenciesGridProps {}

export function CurrenciesGrid(_: ICurrenciesGridProps) {
    const { data, isPending } = useCurrencies();

    const { mode, changeActiveRowId, activeRowId, resetActiveRowId } = usePaymentDataGridMode();

    const { dict } = useI18n();

    const form = useCurrencyForm();

    const { mutateAsync } = useUpdateCurrency();

    const _data = useMemo(() => {
        return data ?? { data: [], total: 0 };
    }, [data]);

    const editableCurrency = useMemo(() => {
        if (!activeRowId) {
            return null;
        }

        return _data.data.find(({ id }) => {
            return id === activeRowId;
        });
    }, [activeRowId, _data]);

    useEffect(() => {
        if (editableCurrency) {
            form.setValue('code', editableCurrency.code);
            form.setValue('name', editableCurrency.name);
            form.setValue('symbol', editableCurrency.symbol ?? undefined);
        }
    }, [form, editableCurrency]);

    const handleSubmitingFormCallback = async (values: CurrencyFormValues) => {
        await mutateAsync({
            id: editableCurrency!.id,
            ...values,
        });

        resetActiveRowId();
    };
    const handleSubmitCallback = form.handleSubmit(handleSubmitingFormCallback, (errors) => {
        console.log(errors);
    });

    const handleSaveCallback = () => {
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
    );
}
