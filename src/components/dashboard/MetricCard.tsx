import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status?: 'normal' | 'warning' | 'critical';
  subtitle?: string;
}

export default function MetricCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  status = 'normal',
  subtitle 
}: MetricCardProps) {
  const statusColors = {
    normal: 'text-success',
    warning: 'text-warning',
    critical: 'text-critical',
  };

  const statusBgColors = {
    normal: 'bg-success/10',
    warning: 'bg-warning/10',
    critical: 'bg-critical/10',
  };

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn('p-2 rounded-lg', statusBgColors[status])}>
          <Icon className={cn('h-4 w-4', statusColors[status])} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-1">
          <div className={cn('text-2xl font-bold', statusColors[status])}>
            {value}
          </div>
          {unit && (
            <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
