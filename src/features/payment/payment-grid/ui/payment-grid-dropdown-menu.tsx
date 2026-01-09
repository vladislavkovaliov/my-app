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
import { useUpdatePayment } from '@/features/payment/payment-sheet-create/hooks/use-update-payment';
import { $Enums, Payment as IPayment } from '@/generated/prisma';

import PaymentStatus = $Enums.PaymentStatus;

export interface IPaymentGridDropdownMenuProps {
    payment: IPayment;
}

export default function PaymentGridDropdownMenu({ payment }: IPaymentGridDropdownMenuProps) {
    const { mutateAsync } = useUpdatePayment();

    const { changeMode } = usePaymentDataGridMode();

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
                <Button variant="outline">Show Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Payment</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => changeMode()}>
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Delete</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Change Date</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>Change Status</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent onClick={handleChangePaymentStatusCallback}>
                                <DropdownMenuItem data-status={PaymentStatus.PENDING}>
                                    <span>Pending</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem data-status={PaymentStatus.PAID}>
                                    <span>Paid</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem data-status={PaymentStatus.CANCELED}>
                                    <span>Canceled</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>Change Type</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <span>Course</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Package</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Single</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
