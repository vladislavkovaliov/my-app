import { CoursesGrid } from '@/features/course/course-grid/ui/course-grid';
import CoursesSheetCreate from '@/features/course/course-sheet-create/ui/course-sheet-create';

export default function Courses() {
    return (
        <div>
            <CoursesGrid />
            <CoursesSheetCreate />
        </div>
    );
}
