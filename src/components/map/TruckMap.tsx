import { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import type { TelemetryData } from '@/types';
import { Card } from '@/components/ui/card';

// Get Google Maps API key from environment variable
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Default center for India (New Delhi coordinates)
const DEFAULT_CENTER = { lat: 28.6139, lng: 77.2090 };

interface TruckMapProps {
  telemetryData: TelemetryData[];
  currentIndex: number;
  showTrail?: boolean;
}

function MapContent({ telemetryData, currentIndex, showTrail = true }: TruckMapProps) {
  const map = useMap();
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  const currentData = telemetryData[currentIndex];

  useEffect(() => {
    if (!map || !currentData) return;

    map.panTo({ lat: currentData.latitude, lng: currentData.longitude });
  }, [map, currentData, currentIndex]);

  useEffect(() => {
    if (!map || !showTrail) return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const path = telemetryData.slice(0, currentIndex + 1).map(item => ({
      lat: item.latitude,
      lng: item.longitude,
    }));

    polylineRef.current = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: 'hsl(142, 76%, 36%)',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      map,
    });

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map, telemetryData, currentIndex, showTrail]);

  if (!currentData) return null;

  const getMarkerColor = () => {
    if (currentData.door_status === 'open') return '#EAB308';
    const temp = currentData.temperature ?? 0;
    if (temp < 2 || temp > 8) return '#EF4444';
    return '#22C55E';
  };

  const markerIcon = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    scale: 5,
    fillColor: getMarkerColor(),
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 2,
    rotation: currentData.course_deg,
  };

  return (
    <>
      <Marker
        position={{ lat: currentData.latitude, lng: currentData.longitude }}
        icon={markerIcon}
      />
      {telemetryData.slice(0, currentIndex + 1).map((item, idx) => {
        const temp = item.temperature ?? 0;
        if (item.door_status === 'open' || temp < 2 || temp > 8) {
          const eventColor = item.door_status === 'open' ? '#EAB308' : '#EF4444';
          return (
            <Marker
              key={`event-${idx}`}
              position={{ lat: item.latitude, lng: item.longitude }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                fillColor: eventColor,
                fillOpacity: 0.6,
                strokeColor: '#ffffff',
                strokeWeight: 1,
              }}
            />
          );
        }
        return null;
      })}
    </>
  );
}

export default function TruckMap({ telemetryData, currentIndex, showTrail }: TruckMapProps) {
  const [center, setCenter] = useState(DEFAULT_CENTER);

  useEffect(() => {
    if (telemetryData.length > 0) {
      const firstPoint = telemetryData[0];
      setCenter({ lat: firstPoint.latitude, lng: firstPoint.longitude });
    }
  }, [telemetryData]);

  // Check if API key is configured
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return (
      <Card className="w-full h-full flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-2xl">
          <h3 className="text-xl font-semibold text-destructive">Google Maps API Key Required</h3>
          <p className="text-muted-foreground">
            To display the map, you need to configure a Google Maps API key.
          </p>
          <div className="bg-muted p-4 rounded-lg text-left space-y-2">
            <p className="font-semibold">Setup Instructions:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Go to <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a></li>
              <li>Create a new project or select an existing one</li>
              <li>Enable the "Maps JavaScript API"</li>
              <li>Create credentials (API Key)</li>
              <li>Copy your API key</li>
              <li>Add it to your <code className="bg-background px-1 py-0.5 rounded">.env</code> file:</li>
            </ol>
            <pre className="bg-background p-2 rounded text-xs overflow-x-auto">
              VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
            </pre>
            <p className="text-xs text-muted-foreground mt-2">
              Note: Restart the development server after updating the .env file
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (telemetryData.length === 0) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">No tracking data available</p>
      </Card>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="w-full h-full rounded-lg overflow-hidden">
        <Map
          defaultCenter={center}
          defaultZoom={12}
          mapId="coldchain-map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ width: '100%', height: '100%' }}
        >
          <MapContent 
            telemetryData={telemetryData} 
            currentIndex={currentIndex}
            showTrail={showTrail}
          />
        </Map>
      </div>
    </APIProvider>
  );
}
