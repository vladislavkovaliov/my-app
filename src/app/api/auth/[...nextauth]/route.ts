import NextAuth from 'next-auth';
import { Session, SignInParams, AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getGoogleProviderConfig, HOUR } from '@/app/api/auth/[...nextauth]/config';
import { getAccountService, getUserService } from '@/services';

export const authOptions = {
    providers: [GoogleProvider(getGoogleProviderConfig())],
    callbacks: {
        async signIn({ user, account, profile }: SignInParams) {
            if (account?.provider !== 'google') {
                return true;
            }

            const firstName = profile?.name?.split(' ')[0];
            const lastName = profile?.name?.split(' ').slice(1).join(' ');
            const image = user.image;

            const dbUser = await getUserService().findOrCreate({
                email: user.email!,
                firstName: firstName,
                lastName: lastName,
                image: image,
            });

            if (dbUser) {
                await getAccountService().createOrUpdateAccount({
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    type: account.type,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state,
                    userId: dbUser.id,
                });
            }

            return true;
        },
        async jwt({ token }) {
            if (!token.email) return token;

            const dbUser = await getUserService().findUnique({
                email: token.email,
            });

            if (dbUser) {
                token.id = dbUser.id;
            }

            return token;
        },
        async session({ session }: { session: Session }) {
            if (session.user?.email) {
                const dbUser = await getUserService().findUnique({
                    email: session.user.email,
                });

                if (dbUser) {
                    const customUser = session.user;

                    customUser.id = dbUser.id.toString();
                    customUser.firstName = dbUser.firstName || '';
                    customUser.lastName = dbUser.lastName || '';

                    session.user = customUser;
                }
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
        maxAge: HOUR / 2,
        updateAge: 0,
    },
} satisfies AuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
