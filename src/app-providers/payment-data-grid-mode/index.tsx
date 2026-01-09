import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export enum Mode {
    VIEW = 'view',
    EDIT = 'edit',
}

export interface IPaymentDataGridModeContextProps {
    mode: Mode;
    changeMode: () => void;
    activeRowId: string | null;
    changeActiveRowId: (value: { id: string }) => void;
    resetActiveRowId: () => void;
}

export const PaymentDataGridModeContext = createContext<
    IPaymentDataGridModeContextProps | undefined
>(undefined);

export interface IPaymentDataGridModeProviderProps {
    children: ReactNode;
}

export function PaymentDataGridModeProvider({ children }: IPaymentDataGridModeProviderProps) {
    const [mode, setMode] = useState<Mode>(Mode.VIEW);
    const [activeRowId, setActiveRowId] = useState<string | null>(null);

    const handleChangeModeCallback = () => {
        setMode((prevMode) => {
            if (prevMode === Mode.EDIT) {
                return Mode.VIEW;
            }

            return Mode.EDIT;
        });
    };

    const handleChangeActiveRowIdCallback = (value: { id: string }) => {
        setActiveRowId(value.id);
    };

    const handleResetActiveRowIdCallback = () => {
        setActiveRowId(null);
        setMode(Mode.VIEW);
    };

    const value = useMemo(() => {
        return {
            mode: mode,
            activeRowId: activeRowId,
            changeMode: handleChangeModeCallback,
            changeActiveRowId: handleChangeActiveRowIdCallback,
            resetActiveRowId: handleResetActiveRowIdCallback,
        };
    }, [activeRowId, mode]);

    return (
        <PaymentDataGridModeContext.Provider value={value}>
            {children}
        </PaymentDataGridModeContext.Provider>
    );
}

export const usePaymentDataGridMode = () => {
    const context = useContext(PaymentDataGridModeContext);

    if (!context)
        throw new Error('usePaymentDataGridMode must be used within PaymentDataGridModeProvider');

    return context;
};
