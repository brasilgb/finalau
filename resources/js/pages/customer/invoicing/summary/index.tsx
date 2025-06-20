import { DataTable } from '@/components/data-table';
import apios from '@/Utils/connectApi';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { columns } from './columns';
import { useAppContext } from '@/contexts/AppContext';
import moment from 'moment';

export default function Summary() {
    const { url } = usePage().props as any;
    const { companyNumber, selectedDate } = useAppContext();
    const [customerSales, setCustomerSales] = useState<any>([]);

    useEffect(() => {
        const getSummary = async () => {
            await apios.get(`${url}/api/sales?organization=1&company=${companyNumber}&date=${moment(selectedDate).format("YYYYMMDD")}`)
                .then((res) => {
                    setCustomerSales(res.data.response.sales);
                })
                .catch((err) => {
                    console.log(err);

                }).finally(() => console.log('')
                )
        };
        getSummary();
    }, [companyNumber, selectedDate]);

    return (
        <DataTable
            columns={columns}
            data={customerSales}
            label={'Filial'}
            filter={''}
        />
    )
}
