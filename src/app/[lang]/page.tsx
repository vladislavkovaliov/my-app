'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const { data, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        console.log({ data, status });
    }, [data, status]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <Button
                onClick={() => {
                    router.push('/health');
                }}
            >
                Button
            </Button>
        </div>
    );
}
