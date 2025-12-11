import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Alert } from '@/types';
import { format } from 'date-fns';

interface AlertCardProps {
  alert: Alert;
  onClick?: () => void;
}

export default function AlertCard({ alert, onClick }: AlertCardProps) {
  const severityConfig = {
    critical: {
      icon: AlertTriangle,
      bgColor: 'bg-critical/10',
      borderColor: 'border-critical',
      textColor: 'text-critical',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning',
      textColor: 'text-warning',
    },
    info: {
      icon: Info,
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
      textColor: 'text-primary',
    },
  };

  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <Card 
      className={cn(
        'border-l-4 transition-all cursor-pointer hover:shadow-lg',
        config.borderColor,
        config.bgColor
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={cn('p-2 rounded-lg', config.bgColor)}>
            <Icon className={cn('h-4 w-4', config.textColor)} />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className={cn('font-semibold text-sm', config.textColor)}>
                {alert.alert_type}
              </p>
              <span className="text-xs text-muted-foreground">
                {format(new Date(alert.timestamp), 'HH:mm')}
              </span>
            </div>
            <p className="text-sm text-foreground">{alert.message}</p>
            <p className="text-xs text-muted-foreground">
              Device: {alert.device_id}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
