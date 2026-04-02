import { PaymentsGrid } from '@/features/payment/payment-grid/ui';
import PaymentsSheetCreate from '@/features/payment/payment-sheet-create/ui';

export default function Page() {
    return (
        <div>
            <PaymentsGrid />
            <PaymentsSheetCreate />
        </div>
    );
}
