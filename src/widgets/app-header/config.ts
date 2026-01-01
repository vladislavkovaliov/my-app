import { MenuConfig } from './types';

export const getMenuConfig = (): MenuConfig => [
    {
        id: 'view',
        i18n: 'view',
        items: [
            {
                id: 'view',
                i18n: 'view',
                type: 'submenu',
                children: [
                    {
                        id: 'table',
                        i18n: 'view.table',
                        type: 'item',
                    },
                ],
            },
            {
                type: 'separator',
                id: 'sep-1',
            },
            {
                type: 'submenu',
                id: 'language',
                i18n: 'language',
                children: [
                    {
                        type: 'checkbox',
                        id: 'language.english',
                        i18n: 'language.english',
                        data: 'en-US',
                    },
                    {
                        type: 'checkbox',
                        id: 'language.russian',
                        i18n: 'language.russian',
                        data: 'ru-RU',
                    },
                ],
            },
        ],
    },
    {
        id: 'profiles',
        i18n: 'profiles',
        items: [
            {
                type: 'item',
                id: 'logout',
                i18n: 'profiles.logout',
            },
        ],
    },
];
