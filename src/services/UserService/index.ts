import { prisma } from '@/lib/prisma';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaService } from '@/services/PrismaService';
import { User } from 'next-auth';

export class UserService extends PrismaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    findUnique = async (user: User) => {
        const dbUser = await this.prisma.user.findUnique({
            where: { emailId: user.email },
            select: { id: true, emailId: true, firstName: true, lastName: true },
        });

        return dbUser;
    };

    findOrCreate = async ({ email, firstName = '', lastName = '' }: User) => {
        const dbUser = await this.findUnique({
            email: email,
        });

        if (dbUser) {
            return dbUser;
        }

        return this.prisma.user.create({
            data: {
                emailId: email,
                firstName: firstName,
                lastName: lastName,
                gender: 'OTHER',
            },
        });
    };
}

let userServiceInstance: UserService | undefined = undefined;

export const getUserService = () => {
    if (userServiceInstance === undefined) {
        userServiceInstance = new UserService(prisma);
    }

    return userServiceInstance;
};
