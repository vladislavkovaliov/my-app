import { User as IUser, Payment as IPayment, $Enums } from '@/generated/prisma';
import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { PrismaService } from '@/services/PrismaService';

import PaymentStatus = $Enums.PaymentStatus;

export class PaymentService extends PrismaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    create = (
        payment: Pick<IPayment, 'amount' | 'paidAt' | 'courseId' | 'currencyId'>,
        user: Pick<IUser, 'id'>,
    ) => {
        return this.prisma.payment.create({
            data: {
                amount: payment.amount,
                type: 'PACKAGE',
                status: 'PENDING',
                paidAt: new Date(payment.paidAt),
                user: { connect: { id: user.id } },
                course: { connect: { id: payment.courseId } },
                currency: { connect: { id: payment.currencyId } },
            },
        });
    };

    findMany = (user: Pick<IUser, 'id'>) => {
        return this.prisma.payment.findMany({
            where: { userId: user.id },
            include: {
                course: true,
                lessonPayments: { include: { lesson: true } },
                currency: true,
            },
        });
    };

    findFirst = (payment: Pick<IPayment, 'id'>, user: Pick<IUser, 'id'>) => {
        return this.prisma.payment.findFirst({
            where: {
                id: payment.id,
                userId: user.id,
            },
        });
    };

    update = (payment: Pick<IPayment, 'id'>, { status }: { status: PaymentStatus }) => {
        return this.prisma.payment.update({
            where: { id: payment.id },
            data: {
                status: status,
                ...(status === 'PAID' && { paidAt: new Date() }),
            },
        });
    };

    getTotal = (user: Pick<IUser, 'id'>) => {
        return this.prisma.payment.count({
            where: { userId: user.id },
        });
    };

    findManyAndTotal = async (user: Pick<IUser, 'id'>) => {
        const [payments, total] = await this.prisma.$transaction([
            this.findMany(user),
            this.getTotal(user),
        ]);

        return { payments, total };
    };
}

let paymentServiceInstance: PaymentService | undefined = undefined;

export const getPaymentService = () => {
    if (paymentServiceInstance === undefined) {
        paymentServiceInstance = new PaymentService(prisma);
    }

    return paymentServiceInstance;
};
