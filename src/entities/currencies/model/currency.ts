import { Currency as ICurrency } from '@/generated/prisma';

export interface ICreateCurrencyBody {
    code: ICurrency['code'];
    name: ICurrency['name'];
    symbol?: ICurrency['symbol'];
    isActive: ICurrency['isActive'];
}
