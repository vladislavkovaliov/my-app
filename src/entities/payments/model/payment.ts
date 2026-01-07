import { Course as ICourse, Currency as ICurrency, Payment as IPayment } from '@/generated/prisma';

export type Lesson = {
    id: string;
    startTime: string;
    endTime: string;
};

export type LessonPayment = {
    id: string;
    amount: number;
    lesson: Lesson;
};

export type Course = {
    id: string;
    title: string;
};

export type Currency = {
    code: string;
    name?: string;
    symbol?: string;
};

export type Payment = {
    id: string;
    amount: number;
    type: 'PACKAGE' | 'SINGLE';
    userId: string;
    course: Course;
    currency: Currency;
    lessonPayments: LessonPayment[];
    createdAt?: string;
    updatedAt?: string;
};

export const ALLOWED_STATUSES = ['PENDING', 'PAID', 'CANCELED'] as const;
export type PaymentStatus = (typeof ALLOWED_STATUSES)[number];

//
// Request params
//
export interface IPaymentParams {
    email: string;
}

export interface ICreatePaymentBody {
    amount: IPayment['amount'];
    courseId: ICourse['id'];
    currencyId: ICurrency['id'];
    paidAt: IPayment['paidAt'];
}

export interface IUpdatePaymentBody {
    paymentId: IPayment['id'];
    amount?: IPayment['amount'];
    courseId?: ICourse['id'];
    currencyId?: ICurrency['id'];
    paidAt?: IPayment['paidAt'];
    status?: PaymentStatus;
}
