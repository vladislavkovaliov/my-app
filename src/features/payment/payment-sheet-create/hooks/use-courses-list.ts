import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getCourses } from '@/entities/courses/api/get-courses-api';
import { Course as ICourse } from '@/generated/prisma';

export const useCoursesList = () => {
    const { data: session } = useSession();

    const userEmail = session?.user?.email;

    return useQuery<{ total: number; data: ICourse[] }>({
        queryKey: ['courses-list', userEmail],
        queryFn: () => {
            if (!userEmail) {
                return Promise.reject(new Error('User not authenticated'));
            }

            return getCourses({});
        },
        enabled: !!userEmail,
    });
};
