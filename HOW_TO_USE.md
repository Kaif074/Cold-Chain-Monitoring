# How to Use the Cold-Chain Monitoring Dashboard

## 🎯 Quick Start (3 Steps)

### Step 1: Login
1. Open the application
2. Enter any username and password
3. Click "Sign In"

### Step 2: Upload Your Data
1. Click **"Data Upload"** in the navigation
2. Fill in the form with your data:
   - **Location**: Get from Google Maps (right-click → copy coordinates)
   - **Temperature**: Enter in °C (safe range: 2-8°C)
   - **Humidity**: Enter in % (0-100)
   - **Pressure**: Enter in kPa
3. Click **"Add Record"**
4. Repeat for each waypoint in your route
5. Click **"Save Data"**

### Step 3: View Your Data
1. Click **"Dashboard"** to see metrics and charts
2. Click **"Live Tracking"** to see your route on the map

## 📍 Getting Coordinates from Google Maps

### Method 1: Right-Click
1. Go to https://maps.google.com
2. Find your location
3. Right-click on the exact spot
4. Click the coordinates (e.g., "37.7749, -122.4194")
5. Coordinates are copied to clipboard
6. Paste into the Data Upload form

### Method 2: Search Address
1. Go to https://www.latlong.net
2. Enter your address
3. Copy the latitude and longitude
4. Paste into the Data Upload form

## 🗺️ Creating a Route

### Example: Warehouse to Customer

**Step 1: Add Start Location (Warehouse)**
- Latitude: `37.7749` (San Francisco)
- Longitude: `-122.4194`
- Temperature: `5.0°C`
- Humidity: `65%`
- Pressure: `101.3 kPa`
- Speed: `0 km/h` (stopped)
- Door Status: `Open` (loading)

**Step 2: Add Transit Point**
- Latitude: `37.5000` (Highway)
- Longitude: `-122.3000`
- Temperature: `5.5°C`
- Humidity: `66%`
- Pressure: `101.2 kPa`
- Speed: `80 km/h` (driving)
- Door Status: `Closed`

**Step 3: Add End Location (Customer)**
- Latitude: `34.0522` (Los Angeles)
- Longitude: `-118.2437`
- Temperature: `5.8°C`
- Humidity: `65%`
- Pressure: `101.0 kPa`
- Speed: `0 km/h` (stopped)
- Door Status: `Open` (delivery)

## 🌡️ Temperature Guidelines

### Safe Range: 2-8°C

- **Below 2°C**: ❄️ Too cold - Critical alert (RED)
- **2-8°C**: ✅ Safe range - Normal (GREEN)
- **Above 8°C**: 🔥 Too warm - Critical alert (RED)

### Example Values

- **Normal**: 5.0°C, 5.5°C, 6.0°C
- **Alert**: 1.5°C (too cold), 9.0°C (too warm)

## 🚗 Speed Guidelines

- **Stopped**: 0 km/h (at warehouse, customer, rest stop)
- **City**: 30-50 km/h (urban areas)
- **Highway**: 60-100 km/h (interstate)

## 🚪 Door Status

- **Open**: At loading/unloading points
- **Closed**: During transit

## 📊 Understanding the Dashboard

### Metric Cards (Top Section)

1. **Temperature Card**: Shows current temperature with color coding
   - Green: Normal (2-8°C)
   - Red: Alert (outside range)

2. **Humidity Card**: Shows current humidity percentage

3. **Pressure Card**: Shows current atmospheric pressure

4. **Speed Card**: Shows current vehicle speed

5. **Door Status Card**: Shows if door is open or closed

6. **Idle Time Card**: Shows total time vehicle was stopped

### Charts (Middle Section)

- **Temperature Chart**: 24-hour trend with safe range indicators
- **Humidity Chart**: 24-hour humidity trend
- **Pressure Chart**: 24-hour pressure trend

### Alerts Panel (Bottom Section)

- **Critical Alerts** (Red): Temperature outside safe range
- **Warning Alerts** (Yellow): Door open during transit
- **Info Alerts** (Blue): System notifications

## 🗺️ Using Live Tracking

### Map Features

- **Blue Marker**: Current vehicle position
- **Blue Line**: Route trail (breadcrumbs)
- **Green Markers**: Normal operation points
- **Yellow Markers**: Door open events
- **Red Markers**: Temperature alerts

### Playback Controls

1. **Play/Pause**: Start or stop the animation
2. **Speed Buttons**: 
   - ×1: Normal speed
   - ×2: Double speed
   - ×5: Fast forward
3. **Time Slider**: Drag to jump to any point in time
4. **Skip Buttons**: Jump forward/backward 10 points

### Current Status Panel

Shows real-time data at the current playback position:
- Temperature
- Humidity
- Pressure
- Speed

## 🔧 Google Maps Setup

### Get API Key

1. Go to: https://console.cloud.google.com/google/maps-apis
2. Create a new project
3. Enable "Maps JavaScript API"
4. Create credentials (API Key)
5. Copy your API key

### Add API Key

1. Open `src/components/map/TruckMap.tsx`
2. Find line 8
3. Replace:
```typescript
const GOOGLE_MAPS_API_KEY = 'YOUR_ACTUAL_GOOGLE_MAPS_API_KEY';
```

## 💾 Saving Your Data

### Save to Browser

Click **"Save Data"** button on the Data Upload page. Your data will be stored in browser storage and persist between sessions.

### Download JSON

Click **"Download JSON"** to export your data as a file. You can:
- Share it with others
- Use it as a backup
- Import it later

### Load Saved Data

Click **"Load Saved"** to restore previously saved data from browser storage.

## 🔄 Workflow

### Complete Workflow

1. **Login** → Enter credentials
2. **Data Upload** → Add your telemetry data
3. **Save** → Click "Save Data" button
4. **Dashboard** → View metrics and charts
5. **Live Tracking** → Watch animated route playback
6. **Device Detail** → View detailed telemetry history

## 📱 Navigation

### Header Menu

- **Dashboard**: Main overview with metrics and charts
- **Live Tracking**: Map with animated route playback
- **Data Upload**: Add your own data
- **Logout**: Sign out of the application

## 🎨 Color Coding System

### Status Colors

- 🟢 **Green**: Normal operation, safe temperature
- 🟡 **Yellow**: Warning, door open event
- 🔴 **Red**: Critical alert, temperature out of range

### Where You'll See Colors

- Metric cards (temperature, door status)
- Map markers (route events)
- Alert cards (severity levels)
- Chart reference lines (safe ranges)

## 🆘 Troubleshooting

### Data Not Showing

**Problem**: Uploaded data doesn't appear in dashboard

**Solution**:
1. Verify data is saved (check "Added Records" section)
2. Click "Save Data" button
3. Navigate to Dashboard
4. Refresh the page (F5)

### Map Not Loading

**Problem**: Map shows blank or error

**Solution**:
1. Check if Google Maps API key is configured
2. Open browser console (F12) for errors
3. Verify API key has "Maps JavaScript API" enabled

### Invalid Coordinates

**Problem**: Error when adding location

**Solution**:
- Latitude: -90 to 90
- Longitude: -180 to 180
- Use decimal format: `37.7749` not `37° 46' 30"`
- Western Hemisphere: negative longitude (e.g., `-122.4194`)

## 💡 Pro Tips

1. **Start with 3-5 waypoints** for your first route
2. **Use Google Maps** to get accurate coordinates
3. **Save frequently** to avoid losing data
4. **Download backups** of your JSON data
5. **Test with sample data** first before adding your own
6. **Check browser console** (F12) if something doesn't work

## 📚 Additional Resources

- **DATA_UPLOAD_GUIDE.md**: Detailed data upload instructions
- **DATA_FORMAT_GUIDE.md**: JSON format specifications
- **QUICK_START.md**: Quick reference guide
- **DEPLOYMENT.md**: Deployment instructions

## 🎯 Common Use Cases

### Use Case 1: Food Delivery

Monitor temperature during food delivery from restaurant to customer.

**Data to Enter**:
- Restaurant location (start)
- Customer location (end)
- Temperature: 5°C (safe for perishables)
- Speed: 0 at stops, 40-60 during transit

### Use Case 2: Pharmaceutical Transport

Track medicine shipment from warehouse to pharmacy.

**Data to Enter**:
- Warehouse location (start)
- Pharmacy location (end)
- Temperature: 2-8°C (vaccine safe range)
- Multiple waypoints for long routes

### Use Case 3: Cold Storage Monitoring

Monitor temperature in stationary cold storage unit.

**Data to Enter**:
- Same location for all records
- Speed: 0 (not moving)
- Temperature variations over time
- Door open/close events

## ✅ Checklist

Before viewing your data:

- [ ] Added at least 2 location records
- [ ] Entered temperature, humidity, pressure for each
- [ ] Clicked "Save Data" button
- [ ] Configured Google Maps API key (for map view)
- [ ] Refreshed the dashboard page

## 🚀 You're Ready!

Follow these steps and you'll have your cold-chain monitoring dashboard up and running with your own data in minutes!

**Need Help?** Check the browser console (F12) for error messages or review the detailed guides in the documentation folder.

---

**Quick Reference Card**

| Field | Format | Example |
|-------|--------|---------|
| Latitude | Decimal | 37.7749 |
| Longitude | Decimal | -122.4194 |
| Temperature | °C | 5.0 |
| Humidity | % | 65.0 |
| Pressure | kPa | 101.3 |
| Speed | km/h | 80 |
| Door Status | open/closed | closed |

**Safe Temperature Range**: 2-8°C
