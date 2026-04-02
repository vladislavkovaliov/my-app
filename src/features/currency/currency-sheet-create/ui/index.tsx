'use client';

import { useCurrencySheetCreate } from '@/app-providers/currency-sheet-create-provider';

import { CurrencyForm } from './currency-form';
import { CurrencySheet } from './currency-sheet';

export interface ICurrenciesSheetCreateProps {}

export default function CurrenciesSheetCreate(_: ICurrenciesSheetCreateProps) {
    const { open, handleClose, handleChange } = useCurrencySheetCreate();

    const handleCloseCallback = () => {
        handleClose();
    };

    return (
        <CurrencySheet open={open} onOpenChange={handleChange}>
            <CurrencyForm onCancel={handleCloseCallback} onSuccess={handleCloseCallback} />
        </CurrencySheet>
    );
}
