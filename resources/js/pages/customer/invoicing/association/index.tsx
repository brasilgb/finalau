import { DataTable } from "@/components/data-table";
import apios from "@/Utils/connectApi";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { useAppContext } from "@/contexts/AppContext";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { maskMoney } from "@/Utils/mask";

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
        <div className="w-full">
            {customerAssociation.filter((fil: any) => (fil.assoc_ass === 'XX')).map((total: any) => (
                <div className="grid md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent>
                            <div className="text-xs font-bold">Meta</div>
                            <div className="text-xl font-bold">R$ {maskMoney(total?.assoc_metdia)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="text-xs font-bold">Venda</div>
                            <div className="text-xl font-bold">R$ {maskMoney(total(total?.assoc_valven))}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="text-xs font-bold">Margem</div>
                            <div className="text-xl font-bold">{total?.assoc_margem}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="text-xs font-bold">Representa</div>
                            <div className="text-xl font-bold">{total?.assoc_repres}</div>
                        </CardContent>
                    </Card>
                </div>
            ))
            }

            <DataTable
                columns={columns}
                data={customerAssociation.filter((fil: any) => (fil.assoc_ass !== 'XX'))}
                label={'Association'}
                filter={''}
            />
        </div>
    )
}
