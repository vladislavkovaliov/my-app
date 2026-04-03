'use client';

import { useCourseSheetCreate } from '@/app-providers/course-sheet-create-provider/course-sheet-create-provider';

import { CourseForm } from './course-form';
import { CourseSheet } from './course-sheet';

export interface ICoursesSheetCreateProps {}

export default function CoursesSheetCreate(_: ICoursesSheetCreateProps) {
    const { open, handleClose, handleChange } = useCourseSheetCreate();

    const handleCloseCallback = () => {
        handleClose();
    };

    return (
        <CourseSheet open={open} onOpenChange={handleChange}>
            <CourseForm onCancel={handleCloseCallback} onSuccess={handleCloseCallback} />
        </CourseSheet>
    );
}
