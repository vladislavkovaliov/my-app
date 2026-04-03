import { Lesson as ILesson } from '@/generated/prisma';
import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { PrismaService } from '@/services/prisma-service/prisma-service';

export class LessonService extends PrismaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    create = (lesson: Pick<ILesson, 'title' | 'startTime' | 'endTime' | 'courseId'>) => {
        return this.prisma.lesson.create({
            data: {
                title: lesson.title ?? null,
                startTime: lesson.startTime,
                endTime: lesson.endTime,
                course: { connect: { id: lesson.courseId } },
            },
            include: {
                course: true,
            },
        });
    };

    update = (
        id: ILesson['id'],
        data: Partial<Pick<ILesson, 'title' | 'startTime' | 'endTime' | 'courseId'>>,
    ) => {
        const { courseId, ...rest } = data;

        return this.prisma.lesson.update({
            where: { id },
            data: {
                ...rest,
                ...(courseId !== undefined && {
                    course: { connect: { id: courseId } },
                }),
            },
            include: {
                course: true,
            },
        });
    };

    findMany = () => {
        return this.prisma.lesson.findMany({
            include: {
                course: true,
            },
            orderBy: { startTime: 'asc' },
        });
    };

    getTotal = () => {
        return this.prisma.lesson.count();
    };

    findManyAndTotal = async () => {
        const [lessons, total] = await this.prisma.$transaction([this.findMany(), this.getTotal()]);

        return { lessons, total };
    };

    delete = (lesson: Pick<ILesson, 'id'>) => {
        return this.prisma.lesson.delete({
            where: { id: lesson.id },
        });
    };
}

let lessonServiceInstance: LessonService | undefined = undefined;

export const getLessonService = () => {
    if (lessonServiceInstance === undefined) {
        lessonServiceInstance = new LessonService(prisma);
    }

    return lessonServiceInstance;
};
