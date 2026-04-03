'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface ICurrencySheetCreateContextProps {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    handleChange: () => void;
}

const CurrencySheetCreateContext = createContext<ICurrencySheetCreateContextProps | undefined>(
    undefined,
);

interface ICurrencySheetCreateProviderProps {
    children: ReactNode;
}

export function CurrencySheetCreateProvider({ children }: ICurrencySheetCreateProviderProps) {
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
        <CurrencySheetCreateContext.Provider value={value}>
            {children}
        </CurrencySheetCreateContext.Provider>
    );
}

export const useCurrencySheetCreate = () => {
    const context = useContext(CurrencySheetCreateContext);

    if (!context) {
        throw new Error('useCurrencySheetCreate must be used within CurrencySheetCreateProvider');
    }

    return context;
};
