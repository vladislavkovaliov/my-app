'use client';

import { useLessonSheetCreate } from '@/app-providers/lesson-sheet-create-provider/lesson-sheet-create-provider';

import { LessonForm } from './lesson-form';
import { LessonSheet } from './lesson-sheet';

export interface ILessonsSheetCreateProps {}

export default function LessonsSheetCreate(_: ILessonsSheetCreateProps) {
    const { open, handleClose, handleChange } = useLessonSheetCreate();

    const handleCloseCallback = () => {
        handleClose();
    };

    return (
        <LessonSheet open={open} onOpenChange={handleChange}>
            <LessonForm onCancel={handleCloseCallback} onSuccess={handleCloseCallback} />
        </LessonSheet>
    );
}
