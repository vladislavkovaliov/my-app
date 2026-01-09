import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface IPaymentSheetDatePickerDialogContextProps {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    handleChange: () => void;
}

export const PaymentSheetDatePickerDialogContext = createContext<
    IPaymentSheetDatePickerDialogContextProps | undefined
>(undefined);

export interface IPaymentSheetDatePickerDialogProviderProps {
    children: ReactNode;
}

export function PaymentSheetDatePickerDialogProvider({
    children,
}: IPaymentSheetDatePickerDialogProviderProps) {
    const [open, setOpen] = useState(false);

    const handleChangeCallback = () => {
        setOpen((x) => !x);
    };

    const handleCloseCallback = () => {
        setOpen(false);
    };

    const handleOpenCallback = (): void => {
        setOpen(true);
    };

    const value = useMemo(() => {
        return {
            open: open,
            handleClose: handleCloseCallback,
            handleOpen: handleOpenCallback,
            handleChange: handleChangeCallback,
        };
    }, [open]);

    return (
        <PaymentSheetDatePickerDialogContext.Provider value={value}>
            {children}
        </PaymentSheetDatePickerDialogContext.Provider>
    );
}

export const usePaymentSheetDatePickerDialog = () => {
    const context = useContext(PaymentSheetDatePickerDialogContext);

    if (!context)
        throw new Error(
            'usePaymentSheetDatePickerDialog must be used within PaymentSheetDatePickerDialogProvider',
        );

    return context;
};
