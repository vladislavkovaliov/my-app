import * as React from 'react';
import { PaymentSheet } from './payment-sheet';
import { PaymentForm } from './payment-form';

export interface IPaymentsSheetCreateProps {}

export default function PaymentsSheetCreate(_: IPaymentsSheetCreateProps) {
    const [open, setOpen] = React.useState(false);

    const handleCloseCallback = () => {
        setOpen(false);
    };

    const handleChangeCallback = setOpen;

    return (
        <PaymentSheet open={open} onOpenChange={handleChangeCallback}>
            <PaymentForm onCancel={handleCloseCallback} onSuccess={handleCloseCallback} />
        </PaymentSheet>
    );
}
