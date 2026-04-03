import { Course as ICourse } from '@/generated/prisma';
import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { PrismaService } from '@/services/prisma-service/prisma-service';

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

    update = (
        id: ICourse['id'],
        data: Partial<Pick<ICourse, 'title' | 'description' | 'price' | 'currencyId'>>,
    ) => {
        const { currencyId, ...rest } = data;

        return this.prisma.course.update({
            where: { id },
            data: {
                ...rest,
                ...(currencyId !== undefined && {
                    currency: { connect: { id: currencyId } },
                }),
            },
            include: { currency: true },
        });
    };

    findMany = () => {
        return this.prisma.course.findMany({
            include: { currency: true },
            orderBy: { title: 'asc' },
        });
    };

    getTotal = () => {
        return this.prisma.course.count();
    };

    findManyAndTotal = async () => {
        const [courses, total] = await this.prisma.$transaction([this.findMany(), this.getTotal()]);

        return { courses, total };
    };
}

let courseServiceInstance: CourseService | undefined = undefined;

export const getCourseService = () => {
    if (courseServiceInstance === undefined) {
        courseServiceInstance = new CourseService(prisma);
    }

    return courseServiceInstance;
};
