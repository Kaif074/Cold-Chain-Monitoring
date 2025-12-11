import { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import type { TelemetryData } from '@/types';
import { Card } from '@/components/ui/card';

// NOTE: Replace this with your actual Google Maps API key
// Get your API key from: https://console.cloud.google.com/google/maps-apis
const GOOGLE_MAPS_API_KEY = 'AIzaSyBvqPqxqPqxqPqxqPqxqPqxqPqxqPqxqPq';

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
    if (currentData.door_open) return '#EAB308';
    if (currentData.temperature_c < 2 || currentData.temperature_c > 8) return '#EF4444';
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
        if (item.door_open || item.temperature_c < 2 || item.temperature_c > 8) {
          const eventColor = item.door_open ? '#EAB308' : '#EF4444';
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
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (telemetryData.length > 0) {
      const firstPoint = telemetryData[0];
      setCenter({ lat: firstPoint.latitude, lng: firstPoint.longitude });
    }
  }, [telemetryData]);

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
