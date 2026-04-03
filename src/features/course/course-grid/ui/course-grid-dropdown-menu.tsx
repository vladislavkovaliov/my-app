import { type MouseEvent, useMemo } from 'react';

import { useI18n } from '@/app-providers/i-18n-provider';
import { usePaymentDataGridMode } from '@/app-providers/payment-data-grid-mode';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CourseRow } from '@/entities/courses/api/get-courses-api';
import { useCurrenciesList } from '@/features/payment/payment-sheet-create/hooks/use-currencies-list';
import { useUpdateCourse } from '@/shared/hooks/use-update-course';

export interface ICourseGridDropdownMenuProps {
    course: CourseRow;
}

export default function CourseGridDropdownMenu({ course }: ICourseGridDropdownMenuProps) {
    const { mutateAsync } = useUpdateCourse();

    const { changeMode } = usePaymentDataGridMode();

    const { dict } = useI18n();

    const _dict = dict.features['course-grid-dropdown-menu'];

    const { data: currenciesData } = useCurrenciesList();

    const currencies = useMemo(() => {
        if (!currenciesData) {
            return [];
        }

        return currenciesData.data.map((c) => ({
            value: c.id,
            label: `${c.code} — ${c.name}`,
        }));
    }, [currenciesData]);

    const handleChangeCurrencyCallback = async (event: MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement | null;

        const item = target?.closest('[data-currency-id]') as HTMLElement | null;

        if (!item) return;

        const currencyId = item.dataset.currencyId;

        if (!currencyId || currencyId === course.currencyId) return;

        await mutateAsync({
            id: course.id,
            currencyId,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{_dict['show-menu']}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>{_dict.course}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => changeMode()}>
                        <span>{_dict.edit}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>{_dict.delete}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{_dict['course-actions']}</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>{_dict['change-currency']}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent onClick={handleChangeCurrencyCallback}>
                                {currencies.map((c) => (
                                    <DropdownMenuItem
                                        key={c.value}
                                        data-currency-id={c.value}
                                        disabled={c.value === course.currencyId}
                                    >
                                        <span>{c.label}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
