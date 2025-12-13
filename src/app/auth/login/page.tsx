'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
    return (
        <div style={{ maxWidth: 360, margin: '40px auto' }}>
            <button onClick={() => signIn('github')}>Login with GitHub</button>
        </div>
    );
}
