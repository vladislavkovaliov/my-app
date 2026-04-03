import { CellContext } from '@tanstack/table-core';
import { format } from 'date-fns';
import { Control } from 'react-hook-form';

import { Mode } from '@/app-providers/payment-data-grid-mode/payment-data-grid-mode';
import { Dict } from '@/app/[lang]/i18n';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CoursesField } from '@/entities/courses/ui/form-fields/courses-field';
import { LessonEndTimeField } from '@/entities/lessons/ui/form-fields/lesson-end-time-field';
import { LessonStartTimeField } from '@/entities/lessons/ui/form-fields/lesson-start-time-field';
import { LessonTitleField } from '@/entities/lessons/ui/form-fields/lesson-title-field';
import LessonGridDropdownMenu from '@/features/lesson/lesson-grid/ui/lesson-grid-dropdown-menu';
import { Course as ICourse, Lesson as ILesson } from '@/generated/prisma';
import { LessonFormValues } from '@/shared/lib/form/lesson-form-schema';

export type LessonRow = ILesson & {
    course: ICourse;
};

export function getColumns({
    dict,
    mode,
    activeRowId,
    control,
    onCancelEditMode,
    onSave,
    courses,
}: {
    dict: Dict;
    mode: Mode;
    activeRowId: string | null;
    control: Control<LessonFormValues>;
    onCancelEditMode: () => void;
    onSave: () => void;
    courses: {
        value: ICourse['id'];
        label: ICourse['title'];
    }[];
}) {
    const _dict = dict.features['lesson-grid'];

    return [
        {
            accessorKey: 'title',
            header: _dict.title,
            cell: (info: CellContext<LessonRow, unknown>) => (
                <div className="flex min-w-[120px]">
                    {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                        <span className="font-medium">{(info.getValue() as string) ?? '—'}</span>
                    ) : null}
                    {mode === Mode.EDIT && info.row.id === activeRowId ? (
                        <LessonTitleField
                            control={control}
                            name="title"
                            showLabel={false}
                            showDescription={false}
                        />
                    ) : null}
                </div>
            ),
            size: 200,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            id: 'course',
            accessorFn: (row: LessonRow) => row.course?.title ?? '',
            header: _dict.course,
            cell: (info: CellContext<LessonRow, unknown>) => {
                const row = info.row.original;
                const courseTitle = row.course?.title ?? '—';

                return (
                    <div className="flex min-w-[140px]">
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <span className="font-medium">{courseTitle}</span>
                        ) : null}
                        {mode === Mode.EDIT && info.row.id === activeRowId ? (
                            <CoursesField
                                control={control}
                                name="courseId"
                                courses={courses}
                                showLabel={false}
                                showDescription={false}
                            />
                        ) : null}
                    </div>
                );
            },
            size: 200,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'startTime',
            header: _dict.startTime,
            cell: (info: CellContext<LessonRow, unknown>) => (
                <div className="flex min-w-[100px]">
                    {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                        <span className="font-medium">
                            {format(new Date(info.getValue() as string), 'yyyy-MM-dd HH:mm')}
                        </span>
                    ) : null}
                    {mode === Mode.EDIT && info.row.id === activeRowId ? (
                        <LessonStartTimeField
                            control={control}
                            name="startTime"
                            showLabel={false}
                            showDescription={false}
                            showResetIcon={false}
                        />
                    ) : null}
                </div>
            ),
            size: 140,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            accessorKey: 'endTime',
            header: _dict.endTime,
            cell: (info: CellContext<LessonRow, unknown>) => (
                <div className="flex min-w-[100px]">
                    {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                        <span className="font-medium">
                            {format(new Date(info.getValue() as string), 'yyyy-MM-dd HH:mm')}
                        </span>
                    ) : null}
                    {mode === Mode.EDIT && info.row.id === activeRowId ? (
                        <LessonEndTimeField
                            control={control}
                            name="endTime"
                            showLabel={false}
                            showDescription={false}
                            showResetIcon={false}
                        />
                    ) : null}
                </div>
            ),
            size: 140,
            meta: {
                headerClassName: '',
                cellClassName: '',
                skeleton: <Skeleton className="w-28 h-7" />,
            },
        },
        {
            id: 'actions',
            header: '',
            enableSorting: false,
            enableHiding: false,
            cell: (info: CellContext<LessonRow, unknown>) => {
                return (
                    <div className="flex justify-end space-x-2">
                        {mode === Mode.VIEW || info.row.id !== activeRowId ? (
                            <LessonGridDropdownMenu lesson={info.row.original} />
                        ) : null}
                        {mode === Mode.EDIT && info.row.id === activeRowId ? (
                            <>
                                <Button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onCancelEditMode();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="button" onClick={onSave}>
                                    Save
                                </Button>
                            </>
                        ) : null}
                    </div>
                );
            },
        },
    ];
}
