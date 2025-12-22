interface UpsertAccountParams {
    provider: string;
    providerAccountId: string;
    type: string;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    userId: string;
}
