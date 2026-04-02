import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getCourses } from '@/entities/courses/api/get-courses-api';

export const useCourses = () => {
    const { data: session } = useSession();

    const userEmail = session?.user?.email;

    return useQuery({
        queryKey: ['courses', userEmail],
        queryFn: () => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return getCourses({});
        },
        enabled: !!userEmail,
    });
};
