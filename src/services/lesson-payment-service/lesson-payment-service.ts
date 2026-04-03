import { LessonPayment as ILessonPayment, User as IUser } from '@/generated/prisma';
import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { PrismaService } from '@/services/prisma-service/prisma-service';

export class LessonPaymentService extends PrismaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    create = (
        lessonPayment: Pick<ILessonPayment, 'lessonId' | 'paymentId' | 'amount'>,
        _user: Pick<IUser, 'id'>,
    ) => {
        return this.prisma.lessonPayment.create({
            data: {
                lessonId: lessonPayment.lessonId,
                paymentId: lessonPayment.paymentId,
                amount: lessonPayment.amount,
            },
            include: {
                lesson: {
                    include: {
                        course: {
                            include: {
                                currency: true,
                            },
                        },
                    },
                },
                payment: {
                    include: {
                        course: {
                            include: {
                                currency: true,
                            },
                        },
                        currency: true,
                    },
                },
            },
        });
    };

    findMany = () => {
        return this.prisma.lessonPayment.findMany({
            include: {
                lesson: {
                    include: {
                        course: {
                            include: {
                                currency: true,
                            },
                        },
                    },
                },
                payment: {
                    include: {
                        course: {
                            include: {
                                currency: true,
                            },
                        },
                        currency: true,
                    },
                },
            },
        });
    };

    findFirst = (lessonPayment: Pick<ILessonPayment, 'id'>) => {
        return this.prisma.lessonPayment.findFirst({
            where: {
                id: lessonPayment.id,
            },
        });
    };

    update = (lessonPayment: Pick<ILessonPayment, 'id'>, data: Partial<ILessonPayment>) => {
        return this.prisma.lessonPayment.update({
            where: { id: lessonPayment.id },
            data: {
                lessonId: data.lessonId,
                paymentId: data.paymentId,
                amount: data.amount,
            },
        });
    };

    delete = (lessonPayment: Pick<ILessonPayment, 'id'>) => {
        return this.prisma.lessonPayment.delete({
            where: {
                id: lessonPayment.id,
            },
        });
    };

    getTotal = () => {
        return this.prisma.lessonPayment.count();
    };

    findManyAndTotal = async () => {
        const [data, total] = await this.prisma.$transaction([this.findMany(), this.getTotal()]);

        return { data, total };
    };
}

let lessonPaymentServiceInstance: LessonPaymentService | undefined = undefined;

export const getLessonPaymentService = () => {
    if (lessonPaymentServiceInstance === undefined) {
        lessonPaymentServiceInstance = new LessonPaymentService(prisma);
    }

    return lessonPaymentServiceInstance;
};
