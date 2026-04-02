import { Currency as ICurrency } from '@/generated/prisma';
import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { PrismaService } from '@/services/PrismaService';

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
}

let currencyServiceInstance: CurrencyService | undefined = undefined;

export const getCurrencyService = () => {
    if (currencyServiceInstance === undefined) {
        currencyServiceInstance = new CurrencyService(prisma);
    }

    return currencyServiceInstance;
};
