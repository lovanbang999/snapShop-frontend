'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
const chartData = [
  { month: 'January', order: 186, sold: 80, views: 100, conversionRate: 100 },
  { month: 'February', order: 305, sold: 200, views: 200, conversionRate: 80 },
  { month: 'March', order: 237, sold: 120, views: 30, conversionRate: 200 },
  { month: 'April', order: 73, sold: 190, views: 100, conversionRate: 60 },
  { month: 'May', order: 209, sold: 130, views: 110, conversionRate: 120 },
  { month: 'June', order: 214, sold: 140, views: 120, conversionRate: 111 }
]

const chartConfig = {
  order: {
    label: 'Oder',
    color: 'hsl(var(--snap-primary))'
  },
  sold: {
    label: 'Sold',
    color: 'hsla(0, 71%, 36%, 0.6)'
  },
  views: {
    label: 'Views',
    color: 'hsla(267, 54%, 31%, 1)'
  },
  conversionRate: {
    label: 'Conversion rate',
    color: 'hsla(122, 48%, 74%, 0.55)'
  }
} satisfies ChartConfig

export default function LineChartForAnalysis() {
  return (
    <Card className="flex-1">
      <CardContent className="w-full h-full">
        <ChartContainer config={chartConfig} className="aspect-auto h-[400px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="order"
              type="monotone"
              stroke="var(--color-order)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="sold"
              type="monotone"
              stroke="var(--color-sold)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="views"
              type="monotone"
              stroke="var(--color-views)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="conversionRate"
              type="monotone"
              stroke="var(--color-conversionRate)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
