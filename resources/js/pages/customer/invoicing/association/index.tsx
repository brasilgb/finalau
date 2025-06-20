import { DataTable } from "@/components/data-table";
import apios from "@/Utils/connectApi";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { useAppContext } from "@/contexts/AppContext";
import moment from "moment";

export default function Association() {
    const { url } = usePage().props as any;
    const { companyNumber, selectedDate } = useAppContext();
    const [customerAssociation, setCustomerAssociation] = useState<any>([]);

    useEffect(() => {
        const getSummary = async () => {
            await apios.get(`${url}/api/associations?organization=1&company=${companyNumber}&date=${moment(selectedDate).format("YYYYMMDD")}`)
                .then((res) => {
                    setCustomerAssociation(res.data.response.association);
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
            data={customerAssociation}
            label={'Association'}
            filter={''}
        />
    )
}
