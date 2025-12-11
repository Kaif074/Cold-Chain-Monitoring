import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { TelemetryData } from '@/types';
import { format } from 'date-fns';

interface TemperatureChartProps {
  data: TelemetryData[];
  title?: string;
}

export default function TemperatureChart({ data, title = 'Temperature (24h)' }: TemperatureChartProps) {
  const chartData = data.map(item => ({
    time: format(new Date(item.timestamp), 'HH:mm'),
    temperature: item.temperature,
    timestamp: item.timestamp,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{payload[0].payload.time}</p>
          <p className="text-sm text-success">
            Temperature: {payload[0].value.toFixed(1)}°C
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              label={{ value: '°C', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={2} stroke="hsl(var(--warning))" strokeDasharray="3 3" />
            <ReferenceLine y={8} stroke="hsl(var(--warning))" strokeDasharray="3 3" />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
