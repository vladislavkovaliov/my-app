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
import { $Enums, Payment as IPayment } from '@/generated/prisma';
import { useUpdatePayment } from '@/shared/hooks/use-update-payment';

import PaymentStatus = $Enums.PaymentStatus;

export interface IPaymentGridDropdownMenuProps {
    payment: IPayment;
}

export default function PaymentGridDropdownMenu({ payment }: IPaymentGridDropdownMenuProps) {
    const { mutateAsync } = useUpdatePayment();

    const { changeMode } = usePaymentDataGridMode();

    const { dict } = useI18n();

    const _dict = dict.features['payment-grid-dropdown-menu'];

    const handleChangePaymentStatusCallback = async (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement | null;

        const item = target?.closest('[data-status]') as HTMLElement | null;

        if (!item) return;

        const status = item.dataset.status;

        if (!status) return;

        await mutateAsync({
            id: payment.id,
            amount: payment.amount,
            paidAt: payment.paidAt,
            courseId: payment.courseId,
            currencyId: payment.currencyId,
            type: payment.type,
            userId: payment.userId,
            accountId: payment.accountId,
            comment: payment.comment,
            status: status as PaymentStatus,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{_dict['show-menu']}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>{_dict['payment']}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => changeMode()}>
                        <span>{_dict.edit}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>{_dict['delete']}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{_dict['payment-status']}</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>{_dict['change-status']}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent onClick={handleChangePaymentStatusCallback}>
                                <DropdownMenuItem data-status={PaymentStatus.PENDING}>
                                    <span>{_dict['payment-pending']}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem data-status={PaymentStatus.PAID}>
                                    <span>{_dict['payment-paid']}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem data-status={PaymentStatus.CANCELED}>
                                    <span>{_dict['payment-canceled']}</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>{_dict['payment-change-type']}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <span>{_dict.cource}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>{_dict.package}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>{_dict.single}</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
