import { DataTable } from '@/components/data-table';
import apios from '@/Utils/connectApi';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { columns } from './columns';
import { useAppContext } from '@/contexts/AppContext';
import moment from 'moment';
import AppLoading from '@/components/app-loading';

export default function Summary() {
    const { url, auth } = usePage().props as any;
    const { companyNumber, selectedDate, setLoading, loading } = useAppContext();
    const [customerSales, setCustomerSales] = useState<any>([]);

    useEffect(() => {
        const getSummary = async () => {
            setLoading(true);
            await apios.get(`${url}/api/sales?organization=${auth?.user?.organization_id}&company=${companyNumber}&date=${moment(selectedDate).format("YYYYMMDD")}`)
                .then((res) => {
                    setCustomerSales(res.data.response.sales);
                })
                .catch((err) => {
                    console.log(err);

                }).finally(() => setLoading(false)
                )
        };
        getSummary();
    }, [companyNumber, selectedDate]);

    return (
        <>
            {loading && <AppLoading />}
                <DataTable
                    columns={columns}
                    data={customerSales}
                    label={'Filial'}
                    filter={''}
                />
        </>
    )
}
