import { Bar, Line, ComposedChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import moment from "moment"

// Dados fictícios para demonstração
const revenueData = [
    {
        day: "01/12",
        faturamento: 45000,
        meta: 50000,
        margem: 22.5,
    },
    {
        day: "02/12",
        faturamento: 52000,
        meta: 50000,
        margem: 24.1,
    },
    {
        day: "03/12",
        faturamento: 48000,
        meta: 50000,
        margem: 21.8,
    },
    {
        day: "04/12",
        faturamento: 61000,
        meta: 50000,
        margem: 26.3,
    },
    {
        day: "05/12",
        faturamento: 55000,
        meta: 50000,
        margem: 23.7,
    },
    {
        day: "06/12",
        faturamento: 47000,
        meta: 50000,
        margem: 20.9,
    },
    {
        day: "07/12",
        faturamento: 58000,
        meta: 50000,
        margem: 25.2,
    },
    {
        day: "08/12",
        faturamento: 43000,
        meta: 50000,
        margem: 19.8,
    },
    {
        day: "09/12",
        faturamento: 67000,
        meta: 50000,
        margem: 28.1,
    },
    {
        day: "10/12",
        faturamento: 54000,
        meta: 50000,
        margem: 23.4,
    },
]

const chartConfig = {
    faturamento: {
        label: "Faturamento",
        color: "var(--chart-2)",
    },
    meta: {
        label: "Meta",
        color: "var(--chart-5)",
    },
    margem: {
        label: "Margem (%)",
        color: "var(--chart-3)",
    },
}

export default function CompostoDashboard({ data }: any) {

    const chartData = data?.map((value: any) => ({
        day: moment(value?.resumo_datmvt).format("DD"),
        faturamento: parseFloat(value?.resumo_valven),
        meta: parseFloat(value?.resumo_metdia),
        margem: (parseFloat(value?.resumo_margem) * parseFloat(value?.resumo_valven)) / 100,
        pmargem: parseFloat(value?.resumo_margem)
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Análise de Faturamento Diário</CardTitle>
                <CardDescription>Faturamento vs Meta com análise de margem de lucro</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[380px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis
                                yAxisId="left"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(value)
                                }
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        formatter={(value, name, props) => {
                                            if (name === "margem") {
                                                return ["Marg: ", `${(props.payload.pmargem).toFixed(2)}%`]
                                            }
                                            return [name === "faturamento" ? "Fatu: " : "Meta: ",
                                                new Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }).format(value as number)
                                                ,0
                                            ]
                                        }}
                                    />
                                }
                            />
                            <Bar
                                yAxisId="left"
                                dataKey="faturamento"
                                fill="var(--color-faturamento)"
                                radius={[4, 4, 0, 0]}
                                name="faturamento"
                            />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="meta"
                                stroke="var(--color-meta)"
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                dot={{ fill: "var(--color-meta)", strokeWidth: 2, r: 4 }}
                                name="meta"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="margem"
                                stroke="var(--color-margem)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-margem)", strokeWidth: 2, r: 3 }}
                                name="margem"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
