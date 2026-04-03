import { PrismaClient } from '@/generated/prisma/client';

export class PrismaService {
    protected prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }
}
