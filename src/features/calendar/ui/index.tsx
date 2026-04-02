'use client';

import { useMemo } from 'react';

import { useLessonList } from '@/features/calendar/hooks/get-lessons';
import { Calendar } from '@/widgets/calendar';

export function LessonCalendar() {
    const { data: dataLessons } = useLessonList();

    const events = useMemo(() => {
        if (dataLessons === undefined) {
            return [];
        }

        const { data } = dataLessons;

        const events = data.map(({ title, startTime, endTime, course }) => {
            return {
                title: title ?? course.title,
                start: new Date(startTime),
                end: new Date(endTime),
            };
        });

        return events;
    }, [dataLessons]);

    return (
        <div className="h-full">
            <Calendar events={events} />
        </div>
    );
}
