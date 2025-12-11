import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import TemperatureChart from '@/components/dashboard/TemperatureChart';
import HumidityChart from '@/components/dashboard/HumidityChart';
import PressureChart from '@/components/dashboard/PressureChart';
import { dataService } from '@/services/dataService';
import type { TelemetryData } from '@/types';
import { format } from 'date-fns';
import { Clock, DoorOpen, DoorClosed } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DeviceDetail() {
  const { deviceId } = useParams<{ deviceId: string }>();
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to safely get numeric values
  const safeNumber = (value: number | undefined | null): number => {
    return typeof value === 'number' && !isNaN(value) ? value : 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!deviceId) return;
      
      setIsLoading(true);
      try {
        const data = await dataService.fetchTelemetry(deviceId);
        setTelemetryData(data);
      } catch (error) {
        console.error('Error fetching device data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [deviceId]);

  const doorEvents = dataService.getDoorEvents(telemetryData);
  const idleTime = dataService.calculateIdleTime(telemetryData);
  const last24Hours = dataService.filterTelemetryByTimeRange(telemetryData, 24);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64 bg-muted" />
          <Skeleton className="h-96 bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Device Details</h1>
          <p className="text-muted-foreground">Device ID: {deviceId}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{telemetryData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Door Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doorEvents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Idle Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div className="text-2xl font-bold">{idleTime} min</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="charts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="events">Door Events</TabsTrigger>
            <TabsTrigger value="data">Raw Data</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TemperatureChart data={last24Hours} />
              <HumidityChart data={last24Hours} />
              <PressureChart data={last24Hours} />
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Door Events Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {doorEvents.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No door events recorded
                      </p>
                    ) : (
                      doorEvents.map((event, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {event.status === 'opened' ? (
                              <DoorOpen className="h-5 w-5 text-warning" />
                            ) : (
                              <DoorClosed className="h-5 w-5 text-success" />
                            )}
                            <div>
                              <p className="font-medium">
                                Door {event.status}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(event.timestamp), 'PPp')}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={event.status === 'opened' ? 'destructive' : 'default'}
                          >
                            {event.status}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Telemetry Data</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {telemetryData.slice().reverse().map((item, index) => (
                      <details
                        key={index}
                        className="p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/50"
                      >
                        <summary className="font-medium">
                          {format(new Date(item.timestamp), 'PPp')} - Temp: {safeNumber(item.temperature).toFixed(1)}°C
                        </summary>
                        <pre className="mt-2 text-xs overflow-x-auto">
                          {JSON.stringify(item, null, 2)}
                        </pre>
                      </details>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
