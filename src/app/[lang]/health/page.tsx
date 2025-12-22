'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({ params }: PageProps<'/[lang]'>) {
    const { data, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        console.log({ data, status });
    }, [data, status]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            Health Page
            <button
                onClick={() => {
                    router.push('/');
                }}
            >
                go to main
            </button>
        </div>
    );
}
