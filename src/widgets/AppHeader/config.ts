import { MenuConfig } from './types';

export const getMenuConfig = (): MenuConfig => {
    return [
        {
            id: 'view',
            i18n: 'view',
            children: [
                {
                    id: 'table',
                    visible: true,
                    i18n: 'view.table',
                },
            ],
        },
        {
            id: 'profiles',
            i18n: 'profiles',
            children: [
                {
                    id: 'logout',
                    visible: true,
                    i18n: 'profiles.logout',
                },
            ],
        },
    ];
};
