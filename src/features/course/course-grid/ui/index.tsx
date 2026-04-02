'use client';

import { useMemo } from 'react';

import { useI18n } from '@/app-providers/i-18n-provider';
import { useCourses } from '@/features/course/course-grid/hooks/use-courses';
import { DataGrid } from '@/widgets/data-grid';

import { getColumns } from './colums';

export interface ICoursesGridProps {}

export function CoursesGrid(_: ICoursesGridProps) {
    const { data, isPending } = useCourses();

    const { dict } = useI18n();

    const _data = useMemo(() => {
        return data ?? { data: [], total: 0 };
    }, [data]);

    const columns = getColumns({ dict });

    return <DataGrid columns={columns} isLoading={isPending} {..._data} />;
}
