import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding started...');

    await prisma.currency.upsert({
        where: { code: 'BYN' },
        update: {},
        create: { code: 'BYN', name: 'Белорусский рубль', symbol: 'Br' },
    });
    console.log('Currency BYN created.');

    const course = await prisma.course.upsert({
        where: { title: 'Английский для начинающих' },
        update: {},
        create: {
            title: 'Английский для начинающих',
            price: 200,
            currency: { connect: { code: 'BYN' } },
        },
    });
    console.log('Course created:', course.title);

    const lessonsData = [
        {
            courseId: course.id,
            startTime: new Date('2025-01-10T10:00:00Z'),
            endTime: new Date('2025-01-10T11:00:00Z'),
        },
        {
            courseId: course.id,
            startTime: new Date('2025-01-12T10:00:00Z'),
            endTime: new Date('2025-01-12T11:00:00Z'),
        },
        {
            courseId: course.id,
            startTime: new Date('2025-01-14T10:00:00Z'),
            endTime: new Date('2025-01-14T11:00:00Z'),
        },
    ];

    const lessons = await Promise.all(
        lessonsData.map((lesson) => prisma.lesson.create({ data: lesson })),
    );
    console.log(`Created ${lessons.length} lessons for the course.`);

    const user = await prisma.user.findUnique({
        where: { emailId: 'v.v.kovaliov@gmail.com' },
    });

    if (!user) {
        throw new Error('User with email v.v.kovaliov@gmail.com not found');
    }
    console.log('Using existing user:', user.emailId);

    const payment = await prisma.payment.create({
        data: {
            amount: 600,
            type: 'PACKAGE',
            currency: { connect: { code: 'BYN' } },
            user: { connect: { id: user.id } },
            course: { connect: { id: course.id } },
        },
    });
    console.log('Payment created with amount:', payment.amount);

    const pricePerLesson = payment.amount / lessons.length;
    await Promise.all(
        lessons.map((lesson) =>
            prisma.lessonPayment.create({
                data: {
                    paymentId: payment.id,
                    lessonId: lesson.id,
                    amount: pricePerLesson,
                },
            }),
        ),
    );
    console.log('LessonPayment entries created for all lessons.');

    console.log('Seeding finished!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
