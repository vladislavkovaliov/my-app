import { User as NextAuthUser } from 'next-auth';

import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { PrismaService } from '@/services/PrismaService';

export class UserService extends PrismaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    findUnique = async (user: NextAuthUser) => {
        const dbUser = await this.prisma.user.findUnique({
            where: { emailId: user.email },
            select: { id: true, emailId: true, firstName: true, lastName: true, image: true },
        });

        return dbUser;
    };

    findOrCreate = async (user: NextAuthUser) => {
        const { email, firstName = '', lastName = '', image } = user;

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
                image: image ?? null,
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
