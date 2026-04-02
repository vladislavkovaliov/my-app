import { Course as ICourse, Currency as ICurrency } from '@/generated/prisma';

export interface ICreateCourseBody {
    title: ICourse['title'];
    description?: ICourse['description'];
    price: ICourse['price'];
    currencyId: ICurrency['id'];
}
