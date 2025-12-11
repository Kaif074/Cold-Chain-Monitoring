# Quick Start Guide - Adding Your Own Data

## 🚀 Quick Steps to See Your Data

### Step 1: Get a Google Maps API Key (Required for Map Display)

1. Go to: https://console.cloud.google.com/google/maps-apis
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials (API Key)
5. Copy your API key

**📖 For detailed instructions, see [GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md)**

### Step 2: Configure Your Environment

Create or edit the `.env` file in the root directory:

```env
VITE_APP_ID=app-85j7ce9c8ikh
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Important**: 
- Replace `your_actual_api_key_here` with your actual Google Maps API key
- Restart the development server after updating the `.env` file
- Never commit your `.env` file to version control

### Step 3: Add Your Own Route Data

#### Option A: Use the Data Generator (Easiest)

1. Open `scripts/generate-sample-data.js`
2. Edit the `route` array with your coordinates:

```javascript
route: [
  { lat: YOUR_START_LAT, lng: YOUR_START_LNG, name: 'Start Location' },
  { lat: WAYPOINT_LAT, lng: WAYPOINT_LNG, name: 'Waypoint' },
  { lat: YOUR_END_LAT, lng: YOUR_END_LNG, name: 'End Location' },
]
```

3. Run the generator:
```bash
node scripts/generate-sample-data.js > output.txt
```

4. Copy the generated data from `output.txt`

#### Option B: Create Data Manually

Create three JSON files with your data:

**1. Telemetry Data** (temperature, humidity, pressure, GPS):
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
  }
]
```

**2. Alerts Data**:
```json
[
  {
    "id": "alert_001",
    "device_id": "truck_01",
    "timestamp": "2024-12-10T10:30:00Z",
    "severity": "critical",
    "type": "temperature",
    "message": "Temperature exceeded safe range"
  }
]
```

**3. Track Data** (GeoJSON):
```json
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [-122.4194, 37.7749],
        [-118.2437, 34.0522]
      ]
    },
    "properties": {
      "device_id": "truck_01"
    }
  }]
}
```

### Step 4: Upload Your Data

#### Method 1: Use Pastebin (Quick Testing)

1. Go to https://pastebin.com
2. Paste your telemetry data → Click "Create New Paste"
3. Click "raw" → Copy the URL (e.g., https://pastebin.com/raw/XXXXXXXX)
4. Repeat for alerts and track data

#### Method 2: Use Local Files (Recommended)

1. Create directory: `public/data/`
2. Save your files:
   - `public/data/truck01.json` (telemetry)
   - `public/data/alerts.json` (alerts)
   - `public/data/track.json` (track)

### Step 5: Update Data URLs

Open `src/services/dataService.ts` and update lines 3-9:

**For Pastebin:**
```typescript
const DATA_URLS = {
  truck01: 'https://pastebin.com/raw/YOUR_TELEMETRY_ID',
  truck02: 'https://pastebin.com/raw/YOUR_TELEMETRY_ID',
  storage: 'https://pastebin.com/raw/YOUR_TELEMETRY_ID',
  alerts: 'https://pastebin.com/raw/YOUR_ALERTS_ID',
  track: 'https://pastebin.com/raw/YOUR_TRACK_ID',
};
```

**For Local Files:**
```typescript
const DATA_URLS = {
  truck01: '/data/truck01.json',
  truck02: '/data/truck01.json',
  storage: '/data/truck01.json',
  alerts: '/data/alerts.json',
  track: '/data/track.json',
};
```

### Step 6: Run the Application

```bash
npm run dev -- --host 127.0.0.1
```

Open browser to: http://127.0.0.1:5173

## 📍 How to Get Coordinates for Your Route

### Default Location: India
The map is configured with **New Delhi, India** as the default center:
- Latitude: 28.6139
- Longitude: 77.2090

### Method 1: Google Maps

1. Go to https://maps.google.com
2. Right-click on your start location
3. Click the coordinates (e.g., "37.7749, -122.4194")
4. Coordinates are copied to clipboard
5. Repeat for waypoints and destination

### Method 2: Use Address

You can use online geocoding services to convert addresses to coordinates:
- https://www.latlong.net
- https://www.gps-coordinates.net

## 🎯 Example Routes

### Example 1: India Route (Delhi to Mumbai)

Let's create a route from Delhi to Mumbai:

#### 1. Get Coordinates

- New Delhi: 28.6139, 77.2090
- Jaipur (waypoint): 26.9124, 75.7873
- Ahmedabad (waypoint): 23.0225, 72.5714
- Mumbai: 19.0760, 72.8777

#### 2. Edit the Generator

```javascript
route: [
  { lat: 28.6139, lng: 77.2090, name: 'New Delhi' },
  { lat: 26.9124, lng: 75.7873, name: 'Jaipur' },
  { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad' },
  { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
]
```

#### 3. Generate Data

```bash
node scripts/generate-sample-data.js > my-route-data.txt
```

#### 4. Use the Data

Copy the generated JSON from `my-route-data.txt` and upload to Pastebin or save locally.

### Example 2: US Route (New York to Boston)

### 1. Get Coordinates

- New York: 40.7128, -74.0060
- Hartford (waypoint): 41.7658, -72.6734
- Boston: 42.3601, -71.0589

### 2. Edit the Generator

```javascript
route: [
  { lat: 40.7128, lng: -74.0060, name: 'New York, NY' },
  { lat: 41.7658, lng: -72.6734, name: 'Hartford, CT' },
  { lat: 42.3601, lng: -71.0589, name: 'Boston, MA' },
]
```

### 3. Generate Data

```bash
node scripts/generate-sample-data.js > my-route-data.txt
```

### 4. Use the Data

Copy the generated JSON from `my-route-data.txt` and upload to Pastebin or save locally.

## 🔍 Troubleshooting

### Map Not Showing
- ✅ Check if Google Maps API key is valid
- ✅ Open browser console (F12) and look for errors
- ✅ Verify API key has "Maps JavaScript API" enabled

### No Data Displayed
- ✅ Check browser Network tab for failed requests
- ✅ Verify JSON format is valid (use https://jsonlint.com)
- ✅ Ensure URLs are accessible

### Charts Empty
- ✅ Verify timestamps are in ISO 8601 format
- ✅ Check that numeric values are numbers, not strings
- ✅ Ensure device_id matches in all files

## 📚 Additional Resources

- **Full Data Format Guide**: See `DATA_FORMAT_GUIDE.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Usage Guide**: See `USAGE.md`
- **Project Structure**: See `PROJECT_STRUCTURE.md`

## 💡 Tips

1. **Start Simple**: Begin with 3-5 waypoints
2. **Test Incrementally**: Test with sample data first, then replace gradually
3. **Check Console**: Always check browser console for errors
4. **Validate JSON**: Use https://jsonlint.com before uploading
5. **Realistic Data**: Use actual route coordinates from Google Maps

## 🆘 Need Help?

1. Check the browser console (F12) for error messages
2. Verify your data format matches the examples
3. Test with the provided Pastebin URLs first
4. Review the DATA_FORMAT_GUIDE.md for detailed specifications

---

**Ready to Start?**

1. ✅ Get Google Maps API key
2. ✅ Generate or create your data
3. ✅ Upload to Pastebin or save locally
4. ✅ Update dataService.ts
5. ✅ Run `npm run dev`
6. ✅ Open http://127.0.0.1:5173

**Your cold-chain monitoring dashboard will be live!** 🚀
