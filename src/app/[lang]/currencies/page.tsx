import { CurrenciesGrid } from '@/features/currency/currency-grid/ui';
import CurrenciesSheetCreate from '@/features/currency/currency-sheet-create/ui';

export default function CurrenciesPage() {
    return (
        <div>
            <CurrenciesGrid />
            <CurrenciesSheetCreate />
        </div>
    );
}
