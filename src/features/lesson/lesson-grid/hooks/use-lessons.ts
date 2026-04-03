import { useQuery } from '@tanstack/react-query';

import { getLessons } from '@/entities/lessons/api/get-lessons-api';

export const useLessons = () => {
    return useQuery({
        queryKey: ['lessons'],
        queryFn: () => {
            return getLessons();
        },
    });
};
