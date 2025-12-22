export const getGoogleProviderConfig = () => {
    return {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
            params: {
                prompt: 'consent',
                access_type: 'offline',
                response_type: 'code',
            },
        },
    };
};

export const SECONDS = 60;
export const HOUR = 60 * SECONDS;

export const SESSION_MAX_AGE = 10;
