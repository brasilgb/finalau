import { usePage } from '@inertiajs/react';
import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    const { admsetting } = usePage().props as any;
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center">
                <img
                    className='bg-transparent'
                    src={`${admsetting?.logo ? '/storage/logos/' + admsetting?.logo : "/default.png"}`}
                    alt="Imagem de logo"
                />
            </div>
            </>
    );
}
