import { CoursesGrid } from '@/features/course/course-grid/ui';
import CoursesSheetCreate from '@/features/course/course-sheet-create/ui';

export default function Courses() {
    return (
        <div>
            <CoursesGrid />
            <CoursesSheetCreate />
        </div>
    );
}
