import { CurrenciesGrid } from '@/features/currency/currency-grid/ui/currency-grid';
import CurrenciesSheetCreate from '@/features/currency/currency-sheet-create/ui/currency-sheet-create';

export default function CurrenciesPage() {
    return (
        <div>
            <CurrenciesGrid />
            <CurrenciesSheetCreate />
        </div>
    );
}
