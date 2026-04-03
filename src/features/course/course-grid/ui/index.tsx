'use client';

import { useEffect, useMemo } from 'react';

import { useI18n } from '@/app-providers/i-18n-provider';
import { usePaymentDataGridMode } from '@/app-providers/payment-data-grid-mode';
import { Form } from '@/components/ui/form';
import { useCourses } from '@/features/course/course-grid/hooks/use-courses';
import { useCurrenciesList } from '@/features/payment/payment-sheet-create/hooks/use-currencies-list';
import { useCourseForm } from '@/shared/hooks/use-course-form';
import { useUpdateCourse } from '@/shared/hooks/use-update-course';
import { CourseFormValues } from '@/shared/lib/form/course-form-schema';
import { DataGrid } from '@/widgets/data-grid';

import { getColumns } from './colums';

export interface ICoursesGridProps {}

export function CoursesGrid(_: ICoursesGridProps) {
    const { data, isPending } = useCourses();

    const { mode, changeActiveRowId, activeRowId, resetActiveRowId } = usePaymentDataGridMode();

    const { dict } = useI18n();

    const form = useCourseForm();

    const { mutateAsync } = useUpdateCourse();

    const _data = useMemo(() => {
        return data ?? { data: [], total: 0 };
    }, [data]);

    const { data: currenciesData } = useCurrenciesList();

    const currencies = useMemo(() => {
        if (!currenciesData) {
            return [];
        }

        return currenciesData.data.map((currency) => ({
            value: currency.id,
            label: currency.name,
        }));
    }, [currenciesData]);

    const editableCourse = useMemo(() => {
        if (!activeRowId) {
            return null;
        }

        return _data.data.find(({ id }) => id === activeRowId) ?? null;
    }, [activeRowId, _data]);

    useEffect(() => {
        if (editableCourse) {
            form.setValue('title', editableCourse.title);
            form.setValue('description', editableCourse.description ?? '');
            form.setValue('price', editableCourse.price);
            form.setValue('currencyId', editableCourse.currencyId);
        }
    }, [form, editableCourse]);

    const handleSubmitingFormCallback = async (values: CourseFormValues) => {
        if (!editableCourse) return;

        const desc = String(values.description ?? '').trim();

        await mutateAsync({
            id: editableCourse.id,
            title: values.title,
            ...(desc ? { description: desc } : { description: null }),
            price: values.price,
            currencyId: values.currencyId,
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
        currencies: currencies,
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
