'use client';

import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { getMenuConfig } from '@/widgets/app-header/ui/AppHeader/config';
import { MenuConfig, MenuItemChild } from './types';
import { useI18n } from '@/app-providers/I18nProvider';

export interface IAppHeaderProps {}

export function AppHeader({}: IAppHeaderProps) {
    const menus: MenuConfig = getMenuConfig();
    const { dict } = useI18n();

    const translate = dict.widgets['app-header'];

    return (
        <Menubar>
            {menus.map(({ id, i18n, children }) => {
                return (
                    <MenubarMenu key={id}>
                        <MenubarTrigger>{translate[i18n]}</MenubarTrigger>
                        {children
                            .filter(({ visible }) => visible)
                            .map(({ id, i18n }: MenuItemChild) => {
                                return (
                                    <MenubarContent key={id}>
                                        <MenubarCheckboxItem>{translate[i18n]}</MenubarCheckboxItem>
                                    </MenubarContent>
                                );
                            })}
                    </MenubarMenu>
                );
            })}
        </Menubar>
    );
}
