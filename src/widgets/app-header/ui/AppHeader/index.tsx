import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { getMenuConfig } from '@/widgets/app-header/ui/AppHeader/config';
import { MenuConfig, MenuItemChild } from './types';

export interface IAppHeaderProps {}

export function AppHeader({}: IAppHeaderProps) {
    const menus: MenuConfig = getMenuConfig();

    return (
        <Menubar>
            {menus.map(({ id, i18n, children }) => {
                return (
                    <MenubarMenu key={id}>
                        <MenubarTrigger>{i18n}</MenubarTrigger>
                        {children
                            .filter(({ visible }) => visible)
                            .map(({ id, i18n }: MenuItemChild) => {
                                return (
                                    <MenubarContent key={id}>
                                        <MenubarCheckboxItem>{i18n}</MenubarCheckboxItem>
                                    </MenubarContent>
                                );
                            })}
                    </MenubarMenu>
                );
            })}
        </Menubar>
    );
}
