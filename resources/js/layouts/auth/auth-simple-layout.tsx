import AppLogoIcon from '@/components/app-logo-icon';
import AuthLogoIcon from '@/components/auth-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex items-center justify-center p-8 bg-background shadow">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                                <div className="mb-2 flex items-center justify-center rounded-md">
                                    <AuthLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">{title}</h1>
                                <p className="text-center text-sm text-muted-foreground">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-primary/60 to-primary/90 dark:from-primary/20 dark:to-primary/5">
                <div className="absolute inset-0  bg-[url(/auth-images.png)] bg-center bg-no-repeat" />
                <div className="absolute inset-0 flex flex-col items-center justify-between p-8">
                    <div className="text-center space-y-4 max-w-md">
                        <h2 className="text-3xl font-bold text-white drop-shadow-lg">Gerencie seu negócio com inteligência</h2>
                        <p className="text-white/90 drop-shadow text-lg">
                            Acesse sua conta e continue de onde parou. Faça de seus dados seu aliado.
                        </p>
                    </div>
                    <div className="text-center space-y-4 max-w-md">
                        <h2 className="text-3xl font-bold text-white drop-shadow-lg">Transforme dados em resultados</h2>
                        <p className="text-white/90 drop-shadow text-lg">
                            Monitore suas vendas, analise tendências e tome decisões estratégicas com automágico.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
