'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

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
