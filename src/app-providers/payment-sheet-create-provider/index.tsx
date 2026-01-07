import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface IPaymentSheetCreateContextProps {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    handleChange: () => void;
}

const PaymentSheetCreateContext = createContext<IPaymentSheetCreateContextProps | undefined>(
    undefined,
);

interface IPaymentSheetCreateProviderProps {
    children: ReactNode;
}

export function PaymentSheetCreateProvider({ children }: IPaymentSheetCreateProviderProps) {
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
        <PaymentSheetCreateContext.Provider value={value}>
            {children}
        </PaymentSheetCreateContext.Provider>
    );
}

export const usePaymentSheetCreate = () => {
    const context = useContext(PaymentSheetCreateContext);

    if (!context)
        throw new Error('usePaymentSheetCreate must be used within PaymentSheetCreateProvider');

    return context;
};
