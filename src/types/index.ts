export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface TelemetryData {
  timestamp: string;
  device_id: string;
  latitude: number;
  longitude: number;
  speed_kmh: number;
  course_deg: number;
  temperature_c: number;
  humidity_percent: number;
  pressure_kpa: number;
  door_open: boolean;
}

export interface Alert {
  id: string;
  device_id: string;
  alert_type: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  value?: number;
  threshold?: number;
}

export interface GeoJSONTrack {
  type: string;
  features: Array<{
    type: string;
    properties: Record<string, unknown>;
    geometry: {
      type: string;
      coordinates: number[][];
    };
  }>;
}

export interface DeviceInfo {
  id: string;
  name: string;
  type: 'truck' | 'storage';
  status: 'active' | 'inactive' | 'warning' | 'critical';
}
