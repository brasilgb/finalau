import KpiDashboard from '@/components/kpi-dashboard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Building, Building2, DollarSign, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ data }: any) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <KpiDashboard
                        title="Organizações"
                        subtitle=""
                        icon={Building}
                        value={data?.org}
                        type="int"
                    />
                    <KpiDashboard
                        title="Filiais"
                        subtitle=""
                        icon={Building2}
                        value={data?.com}
                        type="int"
                    />
                    <KpiDashboard
                        title="Usuários"
                        subtitle=""
                        icon={User}
                        value={data?.use}
                        type="int"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
