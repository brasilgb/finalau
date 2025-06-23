import { DataTable } from "@/components/data-table";
import apios from "@/Utils/connectApi";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { useAppContext } from "@/contexts/AppContext";
import moment from "moment";
import { Card, CardContent } from "@/components/ui/card";
import { maskMoney } from "@/Utils/mask";
import AppLoading from "@/components/app-loading";

export default function Association() {
    const { url, auth } = usePage().props as any;
    const { companyNumber, selectedDate, setLoading, loading } = useAppContext();
    const [customerAssociation, setCustomerAssociation] = useState<any>([]);
    const [totalAssociation, setTotalAssociation] = useState<any>([]);

    useEffect(() => {
        const getSummary = async () => {
            setLoading(true);
            await apios.get(`${url}/api/associations?organization=${auth?.user?.organization_id}&company=${companyNumber}&date=${moment(selectedDate).format("YYYYMMDD")}`)
                .then((res) => {
                    const data = res.data.response.association;
                    setCustomerAssociation(data);
                    setTotalAssociation(data.filter((fil: any) => (fil.assoc_ass === 'XX')));

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
            <div>
                <div className="grid md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent>
                            <div className="text-xs font-bold">Meta</div>
                            <div className="text-xl font-bold">R$ {maskMoney(totalAssociation[0]?.assoc_metdia)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="text-xs font-bold">Venda</div>
                            <div className="text-xl font-bold">R$ {maskMoney((totalAssociation[0]?.assoc_valven))}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="text-xs font-bold">Margem</div>
                            <div className="text-xl font-bold">{totalAssociation[0]?.assoc_margem}%</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="text-xs font-bold">Representa</div>
                            <div className="text-xl font-bold">{totalAssociation[0]?.assoc_repres}%</div>
                        </CardContent>
                    </Card>
                </div>

                <DataTable
                    columns={columns}
                    data={customerAssociation.filter((fil: any) => (fil.assoc_ass !== 'XX'))}
                    label={'Association'}
                    filter={''}
                />
            </div>
        </>
    )
}
