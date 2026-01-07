import { Session } from 'next-auth';

export async function isAuthorizedSession(session: Session | null) {
    if (!session) {
        return false;
    }

    return true;
}
