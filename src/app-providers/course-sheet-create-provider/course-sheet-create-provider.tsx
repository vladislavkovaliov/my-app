'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface ICourseSheetCreateContextProps {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    handleChange: () => void;
}

const CourseSheetCreateContext = createContext<ICourseSheetCreateContextProps | undefined>(
    undefined,
);

interface ICourseSheetCreateProviderProps {
    children: ReactNode;
}

export function CourseSheetCreateProvider({ children }: ICourseSheetCreateProviderProps) {
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
        <CourseSheetCreateContext.Provider value={value}>
            {children}
        </CourseSheetCreateContext.Provider>
    );
}

export const useCourseSheetCreate = () => {
    const context = useContext(CourseSheetCreateContext);

    if (!context) {
        throw new Error('useCourseSheetCreate must be used within CourseSheetCreateProvider');
    }

    return context;
};
