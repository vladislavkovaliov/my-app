import { PaymentsGrid } from '@/features/payment/payment-grid/ui/payment-grid';
import PaymentsSheetCreate from '@/features/payment/payment-sheet-create/ui/payment-sheet-create';

export default function Page() {
    return (
        <div>
            <PaymentsGrid />
            <PaymentsSheetCreate />
        </div>
    );
}
