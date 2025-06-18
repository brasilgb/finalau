import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ChartContainer } from './ui/chart'
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

interface RadialDashboardProps {
    title: string;
    subtitle: string;
    label: string;
    value: number;
}

export default function RadialDashboard({ title, subtitle, label, value }: RadialDashboardProps) {
    
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={{
                        total: {
                            label: "Score Total",
                            color: "var(--chart-1)",
                        },
                    }}
                    className="mx-auto aspect-square max-h-[180px]"
                >
                    <RadialBarChart
                        data={[{ score: value, fill: "var(--chart-2)" }]}
                        startAngle={0}
                        endAngle={(value / 100) * 360}
                        innerRadius={80}
                        outerRadius={110}
                    >
                        <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 76]}
            />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                    {value}%
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                    {label}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="score"
                            cornerRadius={10}
                            fill="hsl(var(--chart-1))"
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
