import { maskMoney } from '@/Utils/mask';
import { Icon } from './icon';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { DollarSign, LucideIcon, TrendingUp } from 'lucide-react'

interface KpiDashboardProps {
    title: string;
    subtitle: string;
    icon?: LucideIcon | null;
    value: string;
}

export default function KpiDashboard({ title, subtitle, icon, value }: KpiDashboardProps) {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon && <Icon iconNode={icon} className="h-5 w-5" />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">R$ {maskMoney(value)}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    {subtitle}
                </div>
            </CardContent>
        </Card>
    )
}
