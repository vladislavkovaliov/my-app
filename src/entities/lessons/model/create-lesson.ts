import { Lesson as ILesson } from '@/generated/prisma';

export interface ICreateLessonBody {
    title: ILesson['title'];
    startTime: ILesson['startTime'];
    endTime: ILesson['endTime'];
    courseId: ILesson['courseId'];
}
