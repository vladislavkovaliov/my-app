'use client';

import { PaymentsGrid } from '@/features/payment/payment-grid/ui';
import PaymentsSheetCreate from '@/features/payment/payment-sheet-create/ui';

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <PaymentsGrid />
            <PaymentsSheetCreate />
        </div>
    );
}
