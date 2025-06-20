import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAppContext } from "@/contexts/AppContext";
import { Company } from "@/types";
import apios from "@/Utils/connectApi";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

export default function FilterCompany() {
    const { url, auth } = usePage().props as any;
    const { companyNumber, setCompanyNumber } = useAppContext();
    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        const getCompanies = async () => {
            await apios.get(`${url}/api/companies`)
                .then((res) => {
                    setCompanies(res.data.response.company);
                })
                .catch((err) => {
                    console.log(err);

                }).finally(() => console.log('')
                )
        };
        getCompanies();
    }, []);

    const company = companies?.find((comp: any) => comp.id === auth?.user?.company_id);
    if (auth?.user?.organization_id && auth?.user?.company_id) {
        setCompanyNumber(company?.subnumber);
    }

    return (
        <>
            {auth?.user?.organization_id && auth?.user?.company_id
                ? (
                    <Badge variant="default" className="py-1.5 mt-0.5 text-sm font-bold">Filial ativa: {company?.subname}</Badge>
                )
                :
                (
                    <Select
                        onValueChange={(value) => setCompanyNumber(value)}
                        value={`${companyNumber}`}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Dados da rede</SelectItem>
                            {companies?.map((comp: any, idx: number) => (
                                <SelectItem key={idx} value={`${comp.subnumber}`}>{comp.subname}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )
            }
        </>
    )
}