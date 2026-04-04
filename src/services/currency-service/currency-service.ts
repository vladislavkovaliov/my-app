import { Currency as ICurrency } from '@/generated/prisma';
import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { PrismaService } from '@/services/prisma-service/prisma-service';

export class CurrencyService extends PrismaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    create = (currency: Pick<ICurrency, 'code' | 'name' | 'symbol' | 'isActive'>) => {
        return this.prisma.currency.create({
            data: {
                code: currency.code.trim().toUpperCase(),
                name: currency.name.trim(),
                symbol: currency.symbol ?? null,
                isActive: currency.isActive,
            },
        });
    };

    update = (
        id: ICurrency['id'],
        { code, name, symbol, isActive }: Pick<ICurrency, 'code' | 'name' | 'symbol' | 'isActive'>,
    ) => {
        return this.prisma.currency.update({
            where: { id },
            data: {
                code: code.trim().toUpperCase(),
                name: name.trim(),
                symbol: symbol !== null && symbol.trim() !== '' ? symbol.trim() : null,
                isActive: isActive,
            },
        });
    };

    findMany = () => {
        return this.prisma.currency.findMany({
            orderBy: { code: 'asc' },
        });
    };

    getTotal = () => {
        return this.prisma.currency.count();
    };

    findManyAndTotal = async () => {
        const [currencies, total] = await this.prisma.$transaction([
            this.findMany(),
            this.getTotal(),
        ]);

        return { currencies, total };
    };

    delete = (currency: Pick<ICurrency, 'id'>) => {
        return this.prisma.currency.delete({
            where: { id: currency.id },
        });
    };

    canDelete = async (currency: Pick<ICurrency, 'id'>) => {
        const [courseCount, paymentCount] = await this.prisma.$transaction([
            this.prisma.course.count({ where: { currencyId: currency.id } }),
            this.prisma.payment.count({ where: { currencyId: currency.id } }),
        ]);

        return { canDelete: courseCount === 0 && paymentCount === 0, courseCount, paymentCount };
    };
}

let currencyServiceInstance: CurrencyService | undefined = undefined;

export const getCurrencyService = () => {
    if (currencyServiceInstance === undefined) {
        currencyServiceInstance = new CurrencyService(prisma);
    }

    return currencyServiceInstance;
};
