import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Thermometer, Droplets, Gauge, Truck, DoorOpen, Clock } from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import AlertCard from '@/components/dashboard/AlertCard';
import TemperatureChart from '@/components/dashboard/TemperatureChart';
import HumidityChart from '@/components/dashboard/HumidityChart';
import PressureChart from '@/components/dashboard/PressureChart';
import { dataService } from '@/services/dataService';
import type { TelemetryData, Alert } from '@/types';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const navigate = useNavigate();
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [truck01Data, alertsData] = await Promise.all([
          dataService.fetchTelemetry('truck_01'),
          dataService.fetchAlerts(),
        ]);
        setTelemetryData(truck01Data);
        setAlerts(alertsData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const handleUpdate = () => {
      try { dataService.clearCache(); } catch {}
      fetchData();
    };

    window.addEventListener('custom-data-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('custom-data-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const latestData = dataService.getLatestTelemetry(telemetryData);
  const last24Hours = dataService.filterTelemetryByTimeRange(telemetryData, 24);

  // Helper function to safely get numeric values
  const safeNumber = (value: number | undefined | null): number => {
    return typeof value === 'number' && !isNaN(value) ? value : 0;
  };

  const getTemperatureStatus = (temp: number): 'normal' | 'warning' | 'critical' => {
    if (temp < 2 || temp > 8) return 'critical';
    if (temp < 3 || temp > 7) return 'warning';
    return 'normal';
  };

  const handleAlertClick = (alert: Alert) => {
    navigate(`/device/${alert.device_id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64 bg-muted" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 bg-muted" />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-96 bg-muted" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Real-time cold-chain monitoring</p>
          </div>
          {latestData && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium">
                {format(new Date(latestData.timestamp), 'PPp')}
              </p>
            </div>
          )}
        </div>

        {latestData && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <MetricCard
              title="Temperature"
              value={safeNumber(latestData.temperature).toFixed(1)}
              unit="°C"
              icon={Thermometer}
              status={getTemperatureStatus(safeNumber(latestData.temperature))}
              subtitle="Target: 2-8°C"
            />
            <MetricCard
              title="Humidity"
              value={safeNumber(latestData.humidity).toFixed(1)}
              unit="%"
              icon={Droplets}
              status="normal"
            />
            <MetricCard
              title="Pressure"
              value={safeNumber(latestData.pressure).toFixed(1)}
              unit="kPa"
              icon={Gauge}
              status="normal"
            />
            <MetricCard
              title="Speed"
              value={safeNumber(latestData.speed).toFixed(0)}
              unit="km/h"
              icon={Truck}
              status="normal"
            />
            <MetricCard
              title="Door Status"
              value={latestData.door_status === 'open' ? 'Open' : 'Closed'}
              icon={DoorOpen}
              status={latestData.door_status === 'open' ? 'warning' : 'normal'}
            />
            <MetricCard
              title="Idle Time"
              value={dataService.calculateIdleTime(telemetryData)}
              unit="min"
              icon={Clock}
              status="normal"
            />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TemperatureChart data={last24Hours} />
          <HumidityChart data={last24Hours} />
          <PressureChart data={last24Hours} />
        </div>

        {alerts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Alerts</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {alerts.map((alert) => (
                <AlertCard 
                  key={alert.id} 
                  alert={alert} 
                  onClick={() => handleAlertClick(alert)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
