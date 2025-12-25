import { Dict } from '@/app/[lang]/i18n';

export type AppHeaderDictKeys = keyof Dict['widgets']['app-header'];

export type MenuAction = () => void;

export type MenuItem =
    | {
          type: 'item';
          id: string;
          i18n: AppHeaderDictKeys;
          disabled?: boolean;
          inset?: boolean;
          data?: unknown;
          onSelect?: MenuAction;
      }
    | {
          type: 'checkbox';
          id: string;
          i18n: AppHeaderDictKeys;
          checked?: boolean;
          data?: unknown;
          onSelect?: MenuAction;
      }
    | {
          type: 'submenu';
          id: string;
          i18n: AppHeaderDictKeys;
          children: MenuItem[];
          data?: unknown;
          onSelect?: MenuAction;
      }
    | {
          type: 'separator';
          id: string;
      };

export type MenuConfigItem = {
    id: string;
    i18n: AppHeaderDictKeys;
    items: MenuItem[];
};

export type MenuConfig = MenuConfigItem[];
