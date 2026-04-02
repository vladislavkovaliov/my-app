import { Course as ICourse } from '@/generated/prisma';
import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { PrismaService } from '@/services/PrismaService';

export class CourseService extends PrismaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    create = (course: Pick<ICourse, 'title' | 'description' | 'price' | 'currencyId'>) => {
        return this.prisma.course.create({
            data: {
                title: course.title,
                description: course.description ?? null,
                price: course.price,
                currency: { connect: { id: course.currencyId } },
            },
        });
    };
}

let courseServiceInstance: CourseService | undefined = undefined;

export const getCourseService = () => {
    if (courseServiceInstance === undefined) {
        courseServiceInstance = new CourseService(prisma);
    }

    return courseServiceInstance;
};
