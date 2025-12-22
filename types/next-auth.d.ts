import {
    DefaultSession,
    DefaultUser,
    Account as NextAuthAccount,
    Profile as NextAuthProfile,
} from 'next-auth';

declare module 'next-auth' {
    interface User extends DefaultUser {
        email: string;
        id?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        image?: string | undefined;
    }

    interface Session extends DefaultSession {
        user: User;
    }

    interface SignInParams<UserType = User> {
        user: UserType;
        account: NextAuthAccount | null;
        profile?: NextAuthProfile;
        email?: { verificationRequest?: boolean };
    }
}
