'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface IPaymentDialogManegerContextProps {
    dict: Record<string, boolean>;

    openDialog: (k: string) => void;

    closeDialog: (k: string) => void;

    resetDialogs: () => void;
}

export const PaymentDialogManegerContext = createContext<
    IPaymentDialogManegerContextProps | undefined
>(undefined);

export interface IPaymentDialogManegerProviderProps {
    children: React.ReactNode;
}

export function PaymentDialogManegerProvider({ children }: IPaymentDialogManegerProviderProps) {
    const [dict, setDict] = useState<Record<string, boolean>>({});

    const handleOpenDialogCallback = useCallback(
        (key: string) => {
            setDict({
                ...dict,
                [key]: true,
            });
        },
        [dict],
    );

    const handleCloseDialogCallback = useCallback(
        (key: string) => {
            const copyDict = { ...dict };

            delete copyDict[key];

            setDict({ ...copyDict });
        },
        [dict],
    );

    const handleResetAllDialogsCallback = useCallback(() => {
        setDict({});
    }, []);

    const value = useMemo(() => {
        return {
            dict: dict,
            openDialog: handleOpenDialogCallback,
            closeDialog: handleCloseDialogCallback,
            resetDialogs: handleResetAllDialogsCallback,
        };
    }, [dict, handleCloseDialogCallback, handleResetAllDialogsCallback, handleOpenDialogCallback]);

    return (
        <PaymentDialogManegerContext.Provider value={value}>
            {children}
        </PaymentDialogManegerContext.Provider>
    );
}

export const usePaymentDialogMagener = () => {
    const context = useContext(PaymentDialogManegerContext);

    if (!context)
        throw new Error('usePaymentDialogMagener must be used within PaymentDialogManegerProvider');

    return context;
};
