import apios from '@/Utils/connectApi';
import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react'

export default function Summary() {
    const { url } = usePage().props as any;
    useEffect(() => {
        const getSummary = async () => {
            await apios.get(`${url}/api/sales?organization=1&company=1&date=20240501`)
                .then((res) => {
                    console.log(res.data.response);
                })
                .catch((err) => {
                    console.log(err);

                }).finally(() => console.log('ok')
                )
        };
        getSummary();
    }, []);

    return (
        <div>Summary</div>
    )
}
