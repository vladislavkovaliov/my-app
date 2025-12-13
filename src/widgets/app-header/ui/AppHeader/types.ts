export interface MenuItemChild {
    visible: boolean;
    i18n: string;
    id: string;
}

export interface MenuItem {
    id: string;
    i18n: string;
    children: MenuItemChild[];
}

export type MenuConfig = MenuItem[];
