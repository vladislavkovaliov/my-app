import { useI18n } from '@/app-providers/i-18n-provider/i-18n-provider';
import { usePaymentDataGridMode } from '@/app-providers/payment-data-grid-mode/payment-data-grid-mode';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LessonRow } from '@/features/lesson/lesson-grid/ui/colums';
import { useDeleteLesson } from '@/shared/hooks/use-delete-lesson';

export interface ILessonGridDropdownMenuProps {
    lesson: LessonRow;
}

export default function LessonGridDropdownMenu({ lesson }: ILessonGridDropdownMenuProps) {
    const { mutateAsync: deleteMutateAsync } = useDeleteLesson();

    const { changeMode } = usePaymentDataGridMode();

    const { dict } = useI18n();

    const _dict = dict.features['lesson-grid-dropdown-menu'];

    const handleDeleteCallback = async () => {
        await deleteMutateAsync(lesson.id);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{_dict['show-menu']}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>{_dict.lesson}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => changeMode()}>
                        <span>{_dict.edit}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteCallback}>
                        <span>{_dict.delete}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
