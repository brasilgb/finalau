import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {

    const { admsetting } = usePage().props as any;
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center">
                <img
                    className='bg-transparent'
                    src={`/storage/logos/${admsetting?.logo ? admsetting?.logo : "default.png"}`}
                    alt="Imagem de logo"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">{admsetting?.name}</span>
            </div>
        </>
    );
}
