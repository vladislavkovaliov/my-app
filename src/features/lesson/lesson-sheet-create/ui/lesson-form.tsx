import { useMemo } from 'react';
import * as React from 'react';
import { useWatch } from 'react-hook-form';

import { useI18n } from '@/app-providers/i-18n-provider/i-18n-provider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CoursesField } from '@/entities/courses/ui/form-fields/courses-field';
import { LessonEndTimeField } from '@/entities/lessons/ui/form-fields/lesson-end-time-field';
import { LessonStartTimeField } from '@/entities/lessons/ui/form-fields/lesson-start-time-field';
import { LessonTitleField } from '@/entities/lessons/ui/form-fields/lesson-title-field';
import { useCreateLesson } from '@/features/lesson/lesson-sheet-create/hooks/use-create-lesson';
import { useCoursesList } from '@/features/payment/payment-sheet-create/hooks/use-courses-list';
import { useLessonForm } from '@/shared/hooks/use-lesson-form';

export interface ILessonFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function LessonForm({ onSuccess, onCancel }: ILessonFormProps) {
    const { dict } = useI18n();

    const { data: coursesData } = useCoursesList();

    const { mutateAsync } = useCreateLesson();

    const form = useLessonForm();

    const title = useWatch({ name: 'title', control: form.control });
    const courseId = useWatch({ name: 'courseId', control: form.control });
    const startTime = useWatch({ name: 'startTime', control: form.control });
    const endTime = useWatch({ name: 'endTime', control: form.control });

    const courses = useMemo(() => {
        if (!coursesData) {
            return [];
        }

        return coursesData.data.map((course) => {
            return {
                value: course.id,
                label: course.title,
            };
        });
    }, [coursesData]);

    const disableSubmitButton = !String(title ?? '').trim() || !courseId || !startTime || !endTime;

    const handleCancelCallback = () => {
        onCancel();
    };

    const handleResetCallback = () => {
        form.reset();
    };

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 500));

        const { title: rawTitle, startTime: start, endTime: end, courseId: cid } = form.getValues();

        const trimmed = String(rawTitle ?? '').trim();

        await mutateAsync({
            title: trimmed,
            startTime: start,
            endTime: end,
            courseId: cid,
        });

        onSuccess();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <LessonTitleField control={form.control} name="title" />
                <LessonStartTimeField control={form.control} name="startTime" />
                <LessonEndTimeField control={form.control} name="endTime" />
                <CoursesField control={form.control} name="courseId" courses={courses} />
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleCancelCallback}>
                        {dict.features['payment-form'].cancel}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleResetCallback}>
                        {dict.features['payment-form'].reset}
                    </Button>
                    <Button type="submit" disabled={disableSubmitButton}>
                        {dict.features['payment-form'].submit}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
