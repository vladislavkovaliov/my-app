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
import { Currency as ICurrency } from '@/generated/prisma';
import { useDeleteCurrency } from '@/shared/hooks/use-delete-currency';
import { useUpdateCurrency } from '@/shared/hooks/use-update-currency';

export interface ICurrencyGridDropdownMenuProps {
    currency: ICurrency;
}

export default function CurrencyGridDropdownMenu({ currency }: ICurrencyGridDropdownMenuProps) {
    const { mutateAsync: updateMutateAsync } = useUpdateCurrency();
    const { mutateAsync: deleteMutateAsync } = useDeleteCurrency();

    const { changeMode } = usePaymentDataGridMode();

    const { dict } = useI18n();

    const _dict = dict.features['currency-grid-dropdown-menu'];

    const handleToggleActiveCallback = async () => {
        await updateMutateAsync({
            id: currency.id,
            isActive: !currency.isActive,
        });
    };

    const handleDeleteCallback = async () => {
        await deleteMutateAsync(currency.id);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{_dict['show-menu']}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>{_dict.currency}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => changeMode()}>
                        <span>{_dict.edit}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleToggleActiveCallback}>
                        <span>{currency.isActive ? _dict.deactivate : _dict.activate}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteCallback}>
                        <span>{_dict.delete}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
