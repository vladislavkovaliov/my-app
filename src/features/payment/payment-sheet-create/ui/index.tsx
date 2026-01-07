import * as React from 'react';

import { usePaymentSheetCreate } from '@/app-providers/payment-sheet-create-provider';

import { PaymentForm } from './payment-form';
import { PaymentSheet } from './payment-sheet';

export interface IPaymentsSheetCreateProps {}

export default function PaymentsSheetCreate(_: IPaymentsSheetCreateProps) {
    const { open, handleClose, handleChange } = usePaymentSheetCreate();

    const handleCloseCallback = () => {
        handleClose();
    };

    return (
        <PaymentSheet open={open} onOpenChange={handleChange}>
            <PaymentForm onCancel={handleCloseCallback} onSuccess={handleCloseCallback} />
        </PaymentSheet>
    );
}
