import { prisma } from '@/lib/prisma';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaService } from '@/services/PrismaService';
import { Account as NextAuthAccount } from 'next-auth';

export class AccountService extends PrismaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    createOrUpdateAccount = async (params: NextAuthAccount) => {
        const {
            provider,
            providerAccountId,
            type,
            access_token,
            expires_at,
            token_type,
            scope,
            id_token,
            session_state,
            userId,
        } = params;

        return this.prisma.account.upsert({
            where: {
                provider_providerAccountId: {
                    provider,
                    providerAccountId,
                },
            },
            create: {
                type,
                provider,
                providerAccountId,
                access_token,
                expires_at,
                token_type,
                scope,
                id_token,
                session_state,
                user: { connect: { id: userId } },
            },
            update: {
                access_token,
                expires_at,
                token_type,
                scope,
                id_token,
                session_state,
            },
        });
    };
}

let accountServiceInstance: AccountService | undefined = undefined;

export const getAccountService = () => {
    if (accountServiceInstance === undefined) {
        accountServiceInstance = new AccountService(prisma);
    }

    return accountServiceInstance;
};
