# Data Format Guide - Cold-Chain Monitoring Dashboard

## Overview

This guide explains how to add your own data to the Cold-Chain Monitoring Dashboard. The application currently fetches data from Pastebin URLs, but you can easily replace them with your own data sources.

## Data Formats

### 1. Telemetry Data Format

**File**: Truck/Storage telemetry data
**Format**: JSON array of telemetry records

```json
[
  {
    "timestamp": "2024-12-10T08:00:00Z",
    "device_id": "truck_01",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "temperature": 5.2,
    "humidity": 65.5,
    "pressure": 101.3,
    "speed": 45.5,
    "course_deg": 180,
    "door_status": "closed"
  },
  {
    "timestamp": "2024-12-10T08:05:00Z",
    "device_id": "truck_01",
    "latitude": 37.7850,
    "longitude": -122.4094,
    "temperature": 5.5,
    "humidity": 66.0,
    "pressure": 101.2,
    "speed": 50.0,
    "course_deg": 185,
    "door_status": "closed"
  }
]
```

**Required Fields:**
- `timestamp`: ISO 8601 format date-time string
- `device_id`: String identifier for the device
- `latitude`: Number (decimal degrees)
- `longitude`: Number (decimal degrees)
- `temperature`: Number (degrees Celsius)
- `humidity`: Number (percentage)
- `pressure`: Number (kPa)
- `speed`: Number (km/h)
- `course_deg`: Number (0-360 degrees, heading direction)
- `door_status`: String ("open" or "closed")

### 2. Alerts Data Format

**File**: Alerts data
**Format**: JSON array of alert records

```json
[
  {
    "id": "alert_001",
    "device_id": "truck_01",
    "timestamp": "2024-12-10T10:30:00Z",
    "severity": "critical",
    "type": "temperature",
    "message": "Temperature exceeded safe range: 12.5°C"
  },
  {
    "id": "alert_002",
    "device_id": "truck_01",
    "timestamp": "2024-12-10T11:15:00Z",
    "severity": "warning",
    "type": "door",
    "message": "Door opened during transit"
  }
]
```

**Required Fields:**
- `id`: Unique string identifier
- `device_id`: String identifier for the device
- `timestamp`: ISO 8601 format date-time string
- `severity`: String ("critical", "warning", or "info")
- `type`: String (alert type, e.g., "temperature", "door", "system")
- `message`: String (human-readable alert message)

### 3. GeoJSON Track Data Format

**File**: Route/track data
**Format**: GeoJSON FeatureCollection

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-122.4194, 37.7749],
          [-122.4094, 37.7850],
          [-122.3994, 37.7950]
        ]
      },
      "properties": {
        "device_id": "truck_01",
        "route_name": "Route A"
      }
    }
  ]
}
```

**Required Structure:**
- `type`: "FeatureCollection"
- `features`: Array of Feature objects
  - `type`: "Feature"
  - `geometry`: Object with `type` ("LineString") and `coordinates` (array of [longitude, latitude] pairs)
  - `properties`: Object with custom properties

## How to Add Your Own Data

### Method 1: Replace Pastebin URLs (Recommended for Testing)

1. Create your data files in the formats above
2. Upload them to Pastebin (https://pastebin.com)
3. Get the raw URLs (e.g., https://pastebin.com/raw/XXXXXXXX)
4. Update `src/services/dataService.ts`:

```typescript
const DATA_URLS = {
  truck01: 'https://pastebin.com/raw/YOUR_TRUCK01_ID',
  truck02: 'https://pastebin.com/raw/YOUR_TRUCK02_ID',
  storage: 'https://pastebin.com/raw/YOUR_STORAGE_ID',
  alerts: 'https://pastebin.com/raw/YOUR_ALERTS_ID',
  track: 'https://pastebin.com/raw/YOUR_TRACK_ID',
};
```

### Method 2: Use Local JSON Files

1. Create a `public/data/` directory
2. Add your JSON files:
   - `public/data/truck01.json`
   - `public/data/truck02.json`
   - `public/data/storage.json`
   - `public/data/alerts.json`
   - `public/data/track.json`

3. Update `src/services/dataService.ts`:

```typescript
const DATA_URLS = {
  truck01: '/data/truck01.json',
  truck02: '/data/truck02.json',
  storage: '/data/storage.json',
  alerts: '/data/alerts.json',
  track: '/data/track.json',
};
```

### Method 3: Connect to Your Own API

1. Update `src/services/dataService.ts`:

```typescript
const API_BASE_URL = 'https://your-api.com/api';

const DATA_URLS = {
  truck01: `${API_BASE_URL}/telemetry/truck_01`,
  truck02: `${API_BASE_URL}/telemetry/truck_02`,
  storage: `${API_BASE_URL}/telemetry/storage_01`,
  alerts: `${API_BASE_URL}/alerts`,
  track: `${API_BASE_URL}/track/truck_01`,
};
```

## Google Maps Configuration

### Current Status
The application uses a placeholder Google Maps API key. To enable the map:

1. **Get a Google Maps API Key:**
   - Go to: https://console.cloud.google.com/google/maps-apis
   - Create a new project or select existing
   - Enable "Maps JavaScript API"
   - Create credentials (API Key)
   - Restrict the key to your domain (optional but recommended)

2. **Update the API Key:**
   - Open `src/components/map/TruckMap.tsx`
   - Replace the placeholder key:

```typescript
// Line 8 in TruckMap.tsx
const GOOGLE_MAPS_API_KEY = 'YOUR_ACTUAL_GOOGLE_MAPS_API_KEY';
```

### Alternative: Use Environment Variable

1. Create a `.env` file in the project root:

```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

2. Update `src/components/map/TruckMap.tsx`:

```typescript
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'fallback_key';
```

## Creating a Route from Start to Destination

### Example: San Francisco to Los Angeles Route

1. **Create Telemetry Data with Route Points:**

```json
[
  {
    "timestamp": "2024-12-10T08:00:00Z",
    "device_id": "truck_01",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "temperature": 5.2,
    "humidity": 65.5,
    "pressure": 101.3,
    "speed": 0,
    "course_deg": 180,
    "door_status": "closed"
  },
  {
    "timestamp": "2024-12-10T08:30:00Z",
    "device_id": "truck_01",
    "latitude": 37.5000,
    "longitude": -122.3000,
    "temperature": 5.5,
    "humidity": 66.0,
    "pressure": 101.2,
    "speed": 65,
    "course_deg": 185,
    "door_status": "closed"
  },
  {
    "timestamp": "2024-12-10T09:00:00Z",
    "device_id": "truck_01",
    "latitude": 37.2000,
    "longitude": -122.1000,
    "temperature": 6.0,
    "humidity": 67.0,
    "pressure": 101.1,
    "speed": 70,
    "course_deg": 190,
    "door_status": "closed"
  },
  {
    "timestamp": "2024-12-10T12:00:00Z",
    "device_id": "truck_01",
    "latitude": 34.0522,
    "longitude": -118.2437,
    "temperature": 5.8,
    "humidity": 65.0,
    "pressure": 101.0,
    "speed": 0,
    "course_deg": 180,
    "door_status": "closed"
  }
]
```

2. **Create Matching GeoJSON Track:**

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-122.4194, 37.7749],
          [-122.3000, 37.5000],
          [-122.1000, 37.2000],
          [-118.2437, 34.0522]
        ]
      },
      "properties": {
        "device_id": "truck_01",
        "route_name": "SF to LA",
        "start_location": "San Francisco, CA",
        "end_location": "Los Angeles, CA"
      }
    }
  ]
}
```

## Tips for Creating Realistic Data

### 1. Temperature Data
- Normal range: 2-8°C (cold chain)
- Add variations: ±0.5°C every 5 minutes
- Create alerts when temperature goes outside range

### 2. GPS Coordinates
- Use actual route coordinates from Google Maps
- Calculate bearing between points for `course_deg`
- Add small variations for realistic movement

### 3. Speed Data
- Highway: 80-100 km/h
- City: 30-50 km/h
- Stopped: 0 km/h
- Idle time: consecutive records with speed = 0

### 4. Door Events
- Change `door_status` from "closed" to "open" at delivery points
- Create corresponding alerts for door openings

### 5. Timestamps
- Use consistent intervals (e.g., every 5 minutes)
- ISO 8601 format: "2024-12-10T08:00:00Z"
- Ensure chronological order

## Testing Your Data

1. **Validate JSON Format:**
   - Use https://jsonlint.com to validate your JSON
   - Ensure all required fields are present

2. **Test Coordinates:**
   - Plot coordinates on Google Maps to verify route
   - Ensure longitude is negative for Western Hemisphere
   - Ensure latitude/longitude are in correct order

3. **Check Data Consistency:**
   - Timestamps should be in order
   - Device IDs should match across files
   - Coordinates should form a logical path

## Common Issues and Solutions

### Issue: Map Not Showing
**Solution:** 
- Verify Google Maps API key is valid
- Check browser console for errors
- Ensure coordinates are in correct format [longitude, latitude]

### Issue: No Data Displayed
**Solution:**
- Check network tab for failed requests
- Verify JSON format is correct
- Ensure CORS is enabled on your data source

### Issue: Charts Not Rendering
**Solution:**
- Verify timestamp format is ISO 8601
- Ensure numeric values are numbers, not strings
- Check that data array is not empty

## Example: Complete Dataset

See the current Pastebin URLs for complete working examples:
- Truck 01: https://pastebin.com/raw/TS0pTjRN
- Truck 02: https://pastebin.com/raw/YzhyJ6GT
- Storage: https://pastebin.com/raw/ea9pcTtk
- Alerts: https://pastebin.com/raw/eZsbAFtU
- Track: https://pastebin.com/raw/zbKqRsmp

## Need Help?

If you need assistance:
1. Check the browser console for errors
2. Verify your data format matches the examples
3. Test with the provided Pastebin URLs first
4. Gradually replace with your own data

---

**Last Updated:** December 11, 2025
