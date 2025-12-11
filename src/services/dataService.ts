import type { TelemetryData, Alert, GeoJSONTrack } from '@/types';

const DATA_URLS = {
  truck01: 'https://pastebin.com/raw/TS0pTjRN',
  truck02: 'https://pastebin.com/raw/YzhyJ6GT',
  storage: 'https://pastebin.com/raw/ea9pcTtk',
  alerts: 'https://pastebin.com/raw/eZsbAFtU',
  track: 'https://pastebin.com/raw/zbKqRsmp',
};

class DataService {
  private cache: Map<string, unknown> = new Map();

  async fetchTelemetry(deviceId: string): Promise<TelemetryData[]> {
    const cacheKey = `telemetry_${deviceId}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as TelemetryData[];
    }

    // Check for custom uploaded data first
    const customData = localStorage.getItem('custom_telemetry_data');
    if (customData) {
      try {
        const parsed = JSON.parse(customData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.cache.set(cacheKey, parsed);
          return parsed;
        }
      } catch (error) {
        console.error('Error parsing custom telemetry data:', error);
      }
    }

    let url: string;
    switch (deviceId) {
      case 'truck_01':
        url = DATA_URLS.truck01;
        break;
      case 'truck_02':
        url = DATA_URLS.truck02;
        break;
      case 'storage_01':
        url = DATA_URLS.storage;
        break;
      default:
        throw new Error(`Unknown device ID: ${deviceId}`);
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Error fetching telemetry for ${deviceId}:`, error);
      return [];
    }
  }

  async fetchAlerts(): Promise<Alert[]> {
    const cacheKey = 'alerts';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as Alert[];
    }

    try {
      const response = await fetch(DATA_URLS.alerts);
      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return [];
    }
  }

  async fetchTrack(): Promise<GeoJSONTrack | null> {
    const cacheKey = 'track';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as GeoJSONTrack;
    }

    try {
      const response = await fetch(DATA_URLS.track);
      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching track:', error);
      return null;
    }
  }

  getLatestTelemetry(telemetryData: TelemetryData[]): TelemetryData | null {
    if (telemetryData.length === 0) return null;
    return telemetryData[telemetryData.length - 1];
  }

  calculateIdleTime(telemetryData: TelemetryData[]): number {
    let idleMinutes = 0;
    
    for (let i = 1; i < telemetryData.length; i++) {
      const current = telemetryData[i];
      const previous = telemetryData[i - 1];
      
      if ((current.speed ?? 0) === 0 && (previous.speed ?? 0) === 0) {
        const currentTime = new Date(current.timestamp).getTime();
        const previousTime = new Date(previous.timestamp).getTime();
        const diffMinutes = (currentTime - previousTime) / (1000 * 60);
        idleMinutes += diffMinutes;
      }
    }
    
    return Math.round(idleMinutes);
  }

  getDoorEvents(telemetryData: TelemetryData[]): Array<{ timestamp: string; status: string }> {
    const events: Array<{ timestamp: string; status: string }> = [];
    
    for (let i = 1; i < telemetryData.length; i++) {
      const current = telemetryData[i];
      const previous = telemetryData[i - 1];
      
      if (current.door_status !== previous.door_status) {
        events.push({
          timestamp: current.timestamp,
          status: current.door_status,
        });
      }
    }
    
    return events;
  }

  filterTelemetryByTimeRange(
    telemetryData: TelemetryData[],
    hours: number
  ): TelemetryData[] {
    const now = new Date();
    const cutoff = new Date(now.getTime() - hours * 60 * 60 * 1000);
    
    return telemetryData.filter(item => {
      const itemTime = new Date(item.timestamp);
      return itemTime >= cutoff;
    });
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const dataService = new DataService();
