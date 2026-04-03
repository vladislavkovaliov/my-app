import { LessonsGrid } from '@/features/lesson/lesson-grid/ui/lesson-grid';
import LessonsSheetCreate from '@/features/lesson/lesson-sheet-create/ui/lesson-sheet-create';

export default function Lessons() {
    return (
        <div>
            <LessonsGrid />
            <LessonsSheetCreate />
        </div>
    );
}
