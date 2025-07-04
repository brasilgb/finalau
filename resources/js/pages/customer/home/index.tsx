import AnaliticHeader from '@/components/analitic-header'
import CompostoDashboard from '@/components/composto-dashboard'
import KpiDashboard from '@/components/kpi-dashboard'
import RadialDashboard from '@/components/radial-dashboard'
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'
import { useAppContext } from '@/contexts/AppContext'
import CustomerLayout from '@/layouts/customer-layout'
import apios from '@/Utils/connectApi'
import { Head, usePage } from '@inertiajs/react'
import { ChartCandlestick, ChartScatter, DollarSign, TrendingUpDown } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import 'animate.css';
import { set } from 'date-fns'
import AppLoading from '@/components/app-loading'

export default function home() {
    const { url, auth } = usePage().props as any;
    const { companyNumber, selectedDate, loading, setLoading } = useAppContext();
    const [totalSales, setTotalSales] = useState<any>([]);
    const [chartSales, setChartSales] = useState<any>([]);

    useEffect(() => {
        const getTotals = async () => {
            setLoading(true);
            await apios.get(`${url}/api/totals?organization=${auth?.user?.organization_id}&company=${companyNumber}&date=${moment(selectedDate).format("YYYYMMDD")}`)
                .then((res) => {
                    setTotalSales(res.data.response.totals);
                })
                .catch((err) => {
                    console.log(err);

                }).finally(() => setLoading(false)
                )
        };
        getTotals();
    }, [companyNumber, selectedDate, auth]);

    useEffect(() => {
        const getSummary = async () => {
            setLoading(true);
            await apios.get(`${url}/api/chartsales?organization=1&company=${companyNumber}&date=${moment(selectedDate).format("YYYYMMDD")}`)
                .then((res) => {
                    setChartSales(res.data.response.sales);
                })
                .catch((err) => {
                    console.log(err);

                }).finally(() => setLoading(false)
                )
        };
        getSummary();
    }, [companyNumber, selectedDate]);

    return (
        <CustomerLayout>
            <Head title="Dashboard" />
            {loading && <AppLoading />}
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto animate__animated animate__fadeIn">
                    <AnaliticHeader title='Dashboard de Análise' subtitle='Análise de faturamento e métricas principais' />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiDashboard
                            title="Faturamento"
                            subtitle=""
                            icon={DollarSign}
                            value={totalSales?.total_valven}
                        />
                        <KpiDashboard
                            title="Meta"
                            subtitle=""
                            icon={TrendingUpDown}
                            value={totalSales?.total_meta}
                        />
                        <KpiDashboard
                            title="Projeção"
                            subtitle=""
                            icon={ChartCandlestick}
                            value={totalSales?.total_valven}
                        />
                        <KpiDashboard
                            title="Juros"
                            subtitle=""
                            icon={ChartScatter}
                            value={totalSales?.total_valjur}
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate__animated animate__fadeIn">
                        <RadialDashboard
                            title=""
                            subtitle=""
                            label="Margem"
                            value={totalSales?.total_margem}
                        />
                        <RadialDashboard
                            title=""
                            subtitle=""
                            label="Meta"
                            value={totalSales?.total_permet}
                        />
                        <RadialDashboard
                            title=""
                            subtitle=""
                            label="Juros"
                            value={totalSales?.total_perjur}
                        />
                        <RadialDashboard
                            title=""
                            subtitle=""
                            label="Inadimplência"
                            value={totalSales?.total_perina}
                        />
                    </div>
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <CompostoDashboard data={chartSales} />
                </div>
        </CustomerLayout>
    )
}