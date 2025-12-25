import { Dict } from '@/app/[lang]/i18n';

type AppHeaderDictKeys = keyof Dict['widgets']['app-header'];

export interface MenuItemChild {
    visible: boolean;
    i18n: AppHeaderDictKeys;
    id: string;
}

export interface MenuItem {
    id: string;
    i18n: AppHeaderDictKeys;
    children: MenuItemChild[];
}

export type MenuConfig = MenuItem[];
