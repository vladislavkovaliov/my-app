import { useQuery } from '@tanstack/react-query';
import { getCourses } from '@/entities/courses/api/get-courses-api';
import { useSession } from 'next-auth/react';
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
