import { useEffect, useState, useRef } from 'react';
import TruckMap from '@/components/map/TruckMap';
import PlaybackControls from '@/components/map/PlaybackControls';
import { dataService } from '@/services/dataService';
import type { TelemetryData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, Gauge, Truck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Tracking() {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to safely get numeric values
  const safeNumber = (value: number | undefined | null): number => {
    return typeof value === 'number' && !isNaN(value) ? value : 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await dataService.fetchTelemetry('truck_01');
        setTelemetryData(data);
        setCurrentIndex(0);
        if (data.length > 0) {
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error fetching tracking data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const handleUpdate = () => {
      try { dataService.clearCache(); } catch {}
      setIsPlaying(false);
      fetchData();
    };

    window.addEventListener('custom-data-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('custom-data-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  useEffect(() => {
    if (isPlaying && telemetryData.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= telemetryData.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, telemetryData.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value: number[]) => {
    setCurrentIndex(value[0]);
    setIsPlaying(false);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handleSkipBack = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 10));
    setIsPlaying(false);
  };

  const handleSkipForward = () => {
    setCurrentIndex((prev) => Math.min(telemetryData.length - 1, prev + 10));
    setIsPlaying(false);
  };

  const currentData = telemetryData[currentIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64 bg-muted" />
          <Skeleton className="h-[600px] bg-muted" />
          <Skeleton className="h-32 bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Tracking</h1>
          <p className="text-muted-foreground">Real-time vehicle location and route playback</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-[600px]">
              <TruckMap
                telemetryData={telemetryData}
                currentIndex={currentIndex}
                showTrail={true}
              />
            </div>
            <PlaybackControls
              isPlaying={isPlaying}
              currentIndex={currentIndex}
              maxIndex={telemetryData.length - 1}
              playbackSpeed={playbackSpeed}
              currentTimestamp={currentData?.timestamp}
              onPlayPause={handlePlayPause}
              onSliderChange={handleSliderChange}
              onSpeedChange={handleSpeedChange}
              onSkipBack={handleSkipBack}
              onSkipForward={handleSkipForward}
            />
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentData && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4 text-success" />
                        <span className="text-sm text-muted-foreground">Temperature</span>
                      </div>
                      <span className="font-semibold">{safeNumber(currentData.temperature).toFixed(1)}°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-chart-2" />
                        <span className="text-sm text-muted-foreground">Humidity</span>
                      </div>
                      <span className="font-semibold">{safeNumber(currentData.humidity).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4 text-chart-3" />
                        <span className="text-sm text-muted-foreground">Pressure</span>
                      </div>
                      <span className="font-semibold">{safeNumber(currentData.pressure).toFixed(1)} kPa</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Speed</span>
                      </div>
                      <span className="font-semibold">{safeNumber(currentData.speed).toFixed(0)} km/h</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-success" />
                  <span className="text-sm">Normal Operation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-warning" />
                  <span className="text-sm">Door Open Event</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-critical" />
                  <span className="text-sm">Temperature Alert</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
