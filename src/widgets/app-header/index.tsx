'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { usePaymentSheetCreate } from '@/app-providers/payment-sheet-create-provider';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { assertNever } from '@/shared/helpers/assertNever';
import { useLanguageSwitch } from '@/shared/hooks/useLanguageSwitch';
import { getMenuConfig } from '@/widgets/app-header/config';

import { useI18n } from '../../app-providers/i-18n-provider';
import { MenuItem } from './types';

export interface IAppHeaderProps {}

export function AppHeader({}: IAppHeaderProps) {
    const router = useRouter();

    const { dict, lang } = useI18n();

    const translate = dict.widgets['app-header'];

    const languageSwitch = useLanguageSwitch();

    const { handleChange } = usePaymentSheetCreate();

    const handleLanguageSwitch = useCallback(
        (local: string) => () => {
            languageSwitch(local);
        },
        [languageSwitch],
    );

    const handlePaymentCreateChangeCallback = () => {
        handleChange();
    };

    const handleNavigateToPaymentTableCallback = () => {
        router.push('payments');
    };

    const menus = useMemo(() => {
        return getMenuConfig().map((menu) => ({
            ...menu,
            items: menu.items.map((item) => {
                if (item.type === 'submenu' && item.id === 'language') {
                    return {
                        ...item,
                        children: item.children.map((child) => {
                            if (child.type === 'checkbox') {
                                return {
                                    ...child,
                                    checked: child.data === lang,
                                    onSelect: handleLanguageSwitch(child.data as string),
                                };
                            }
                            return child;
                        }),
                    };
                }

                if (item.type === 'item' && item.id === 'payment-create') {
                    return {
                        ...item,
                        onSelect: handlePaymentCreateChangeCallback,
                    };
                }

                if (item.type === 'item' && item.id === 'payment-table') {
                    return {
                        ...item,
                        onSelect: handleNavigateToPaymentTableCallback,
                    };
                }

                return item;
            }),
        }));
    }, [
        lang,
        handleLanguageSwitch,
        handlePaymentCreateChangeCallback,
        handleNavigateToPaymentTableCallback,
    ]);

    const renderItem = (item: MenuItem) => {
        switch (item.type) {
            case 'item':
                return (
                    <MenubarItem
                        key={item.id}
                        disabled={item.disabled}
                        inset={item.inset}
                        onSelect={item.onSelect}
                    >
                        {translate[item.i18n]}
                    </MenubarItem>
                );

            case 'checkbox':
                return (
                    <MenubarCheckboxItem
                        key={item.id}
                        checked={item.checked}
                        onSelect={item.onSelect}
                    >
                        {translate[item.i18n]}
                    </MenubarCheckboxItem>
                );

            case 'separator':
                return <MenubarSeparator key={item.id} />;

            case 'submenu':
                return (
                    <MenubarSub key={item.id}>
                        <MenubarSubTrigger>{translate[item.i18n]}</MenubarSubTrigger>
                        <MenubarSubContent>{item.children.map(renderItem)}</MenubarSubContent>
                    </MenubarSub>
                );

            default:
                return assertNever(item);
        }
    };

    return (
        <Menubar>
            {menus.map((menu) => (
                <MenubarMenu key={menu.id}>
                    <MenubarTrigger>{translate[menu.i18n]}</MenubarTrigger>
                    <MenubarContent>{menu.items.map(renderItem)}</MenubarContent>
                </MenubarMenu>
            ))}
        </Menubar>
    );
}
