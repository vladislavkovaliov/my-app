import { Button } from '@/components/ui/button';

export default async function Page({ params }: PageProps<'/[lang]'>) {
    const { lang } = await params;

    console.log({ lang });

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <Button>Button</Button>
        </div>
    );
}
