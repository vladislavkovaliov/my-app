'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface ILessonSheetCreateContextProps {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    handleChange: () => void;
}

const LessonSheetCreateContext = createContext<ILessonSheetCreateContextProps | undefined>(
    undefined,
);

interface ILessonSheetCreateProviderProps {
    children: ReactNode;
}

export function LessonSheetCreateProvider({ children }: ILessonSheetCreateProviderProps) {
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
        <LessonSheetCreateContext.Provider value={value}>
            {children}
        </LessonSheetCreateContext.Provider>
    );
}

export const useLessonSheetCreate = () => {
    const context = useContext(LessonSheetCreateContext);

    if (!context) {
        throw new Error('useLessonSheetCreate must be used within LessonSheetCreateProvider');
    }

    return context;
};
