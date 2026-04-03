'use client';

import { useEffect, useMemo } from 'react';

import { useI18n } from '@/app-providers/i-18n-provider/i-18n-provider';
import { usePaymentDataGridMode } from '@/app-providers/payment-data-grid-mode/payment-data-grid-mode';
import { Form } from '@/components/ui/form';
import { useLessons } from '@/features/lesson/lesson-grid/hooks/use-lessons';
import { useCoursesList } from '@/features/payment/payment-sheet-create/hooks/use-courses-list';
import { useLessonForm } from '@/shared/hooks/use-lesson-form';
import { useUpdateLesson } from '@/shared/hooks/use-update-lesson';
import { LessonFormValues } from '@/shared/lib/form/lesson-form-schema';
import { DataGrid } from '@/widgets/data-grid/data-grid';

import { getColumns } from './colums';

export interface ILessonsGridProps {}

export function LessonsGrid(_: ILessonsGridProps) {
    const { data, isPending } = useLessons();

    const { mode, changeActiveRowId, activeRowId, resetActiveRowId } = usePaymentDataGridMode();

    const { dict } = useI18n();

    const form = useLessonForm();

    const { mutateAsync } = useUpdateLesson();

    const _data = useMemo(() => {
        return data ?? { data: [], total: 0 };
    }, [data]);

    const { data: coursesData } = useCoursesList();

    const courses = useMemo(() => {
        if (!coursesData) {
            return [];
        }

        return coursesData.data.map((course) => ({
            value: course.id,
            label: course.title,
        }));
    }, [coursesData]);

    const editableLesson = useMemo(() => {
        if (!activeRowId) {
            return null;
        }

        return _data.data.find(({ id }) => id === activeRowId) ?? null;
    }, [activeRowId, _data]);

    useEffect(() => {
        if (editableLesson) {
            form.setValue('title', editableLesson.title ?? '');
            form.setValue('startTime', new Date(editableLesson.startTime));
            form.setValue('endTime', new Date(editableLesson.endTime));
            form.setValue('courseId', editableLesson.courseId);
        }
    }, [form, editableLesson]);

    const handleSubmitingFormCallback = async (values: LessonFormValues) => {
        if (!editableLesson) {
            return;
        }

        const title = String(values.title ?? '').trim();

        await mutateAsync({
            id: editableLesson.id,
            title,
            startTime: values.startTime,
            endTime: values.endTime,
            courseId: values.courseId,
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
        courses: courses,
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
