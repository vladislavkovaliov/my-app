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
    type: 'PACKAGE' | 'SINGLE'; // можно расширить
    userId: string;
    course: Course;
    currency: Currency;
    lessonPayments: LessonPayment[];
    createdAt?: string;
    updatedAt?: string;
};
