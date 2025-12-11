# Data Upload Guide - Cold-Chain Monitoring Dashboard

## Overview

The Data Upload page provides an easy-to-use interface for adding your own telemetry data without editing any code files. You can manually enter data or import JSON files.

## Accessing the Data Upload Page

1. Login to the application
2. Click **"Data Upload"** in the navigation header
3. You'll see two tabs: **Manual Entry** and **JSON Import**

## Method 1: Manual Entry (Recommended for Beginners)

### Step-by-Step Instructions

#### 1. Enter Basic Information

- **Device ID**: Identifier for your device (e.g., `truck_01`, `truck_02`)
- **Door Status**: Select "Closed" or "Open"

#### 2. Enter Location Data

Get coordinates from Google Maps:
1. Go to https://maps.google.com
2. Right-click on your location
3. Click the coordinates to copy them
4. Paste into the form

**Required Fields:**
- **Latitude**: North-South position (e.g., `37.7749`)
- **Longitude**: East-West position (e.g., `-122.4194`)

**Optional Fields:**
- **Speed**: Vehicle speed in km/h (default: 0)
- **Course**: Direction in degrees 0-360 (default: 0)

#### 3. Enter Sensor Data

**Required Fields:**
- **Temperature (°C)**: Current temperature
  - Safe range: 2-8°C
  - Values outside this range will trigger alerts
  
- **Humidity (%)**: Relative humidity (0-100%)
  
- **Pressure (kPa)**: Atmospheric pressure

#### 4. Add the Record

Click **"Add Record"** button to save the entry.

#### 5. Add More Records

Repeat steps 1-4 to create a route with multiple waypoints.

### Example: Creating a Route

**Start Point (San Francisco):**
- Latitude: `37.7749`
- Longitude: `-122.4194`
- Temperature: `5.0`
- Humidity: `65.0`
- Pressure: `101.3`
- Speed: `0` (stopped)

**Waypoint 1 (In Transit):**
- Latitude: `37.5000`
- Longitude: `-122.3000`
- Temperature: `5.5`
- Humidity: `66.0`
- Pressure: `101.2`
- Speed: `80` (highway)

**End Point (Los Angeles):**
- Latitude: `34.0522`
- Longitude: `-118.2437`
- Temperature: `5.8`
- Humidity: `65.5`
- Pressure: `101.0`
- Speed: `0` (stopped)

## Method 2: JSON Import (For Advanced Users)

### JSON Format

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
    "timestamp": "2024-12-10T08:30:00Z",
    "device_id": "truck_01",
    "latitude": 34.0522,
    "longitude": -118.2437,
    "temperature": 5.8,
    "humidity": 66.0,
    "pressure": 101.2,
    "speed": 0,
    "course_deg": 180,
    "door_status": "closed"
  }
]
```

### Import Steps

1. Switch to **"JSON Import"** tab
2. Paste your JSON data in the text area
3. Click **"Import JSON"** button
4. Review the imported data in the preview section

## Saving and Loading Data

### Save Data

Click **"Save Data"** button to store your data in browser storage. This data will persist even after closing the browser.

### Load Saved Data

Click **"Load Saved"** button to restore previously saved data.

### Download JSON

Click **"Download JSON"** button to export your data as a JSON file. You can:
- Share it with others
- Use it as a backup
- Import it later

## Using Your Data in the Dashboard

### Automatic Integration

Once you save data using the Data Upload page, it will automatically be used in:
- **Dashboard**: Shows metrics from your data
- **Live Tracking**: Displays your route on the map
- **Device Detail**: Shows full telemetry history

### Refresh the Dashboard

After uploading data:
1. Navigate to the **Dashboard** page
2. The page will automatically load your custom data
3. If data doesn't appear, refresh the page (F5)

## Tips for Creating Realistic Data

### Temperature Guidelines

- **Normal Range**: 2-8°C (cold chain standard)
- **Critical Low**: < 2°C (triggers red alert)
- **Critical High**: > 8°C (triggers red alert)
- **Variation**: Add small variations (±0.5°C) for realism

### Location Guidelines

- **Start Point**: Speed = 0, Door can be open
- **In Transit**: Speed = 40-100 km/h, Door closed
- **Waypoints**: Reduce speed to 30-50 km/h
- **End Point**: Speed = 0, Door can be open

### Creating a Realistic Route

1. **Plan Your Route**: Use Google Maps to identify waypoints
2. **Get Coordinates**: Right-click on each location to get lat/lng
3. **Add Start Point**: Speed = 0, door open (loading)
4. **Add Transit Points**: Speed = 60-80 km/h, door closed
5. **Add Stops**: Speed = 0, door open (delivery)
6. **Add End Point**: Speed = 0, door closed

### Course (Direction) Values

- **North**: 0° or 360°
- **East**: 90°
- **South**: 180°
- **West**: 270°

Calculate approximate direction between two points or use 180° as default.

## Common Use Cases

### Use Case 1: Simple Delivery Route

**Scenario**: Delivery from warehouse to customer

1. Add warehouse location (speed = 0, door open)
2. Add highway point (speed = 80, door closed)
3. Add customer location (speed = 0, door open)

### Use Case 2: Multi-Stop Route

**Scenario**: Multiple deliveries

1. Add warehouse (start)
2. Add customer 1 (stop, door open)
3. Add transit point
4. Add customer 2 (stop, door open)
5. Add return to warehouse (end)

### Use Case 3: Temperature Alert Simulation

**Scenario**: Test alert system

1. Add normal records (temp = 5°C)
2. Add alert record (temp = 10°C) - triggers critical alert
3. Add recovery record (temp = 5°C)

## Troubleshooting

### Data Not Showing in Dashboard

**Solution:**
1. Verify data is saved (check "Added Records" section)
2. Click "Save Data" button
3. Navigate to Dashboard
4. Refresh the page (F5)
5. Clear cache if needed (Ctrl+Shift+Delete)

### Invalid Coordinates

**Solution:**
- Latitude must be between -90 and 90
- Longitude must be between -180 and 180
- Use decimal format (not degrees/minutes/seconds)
- Western Hemisphere longitudes are negative

### Map Not Showing Route

**Solution:**
1. Ensure you have at least 2 records with different coordinates
2. Verify Google Maps API key is configured
3. Check browser console for errors (F12)

### Temperature Alerts Not Triggering

**Solution:**
- Alerts trigger when temperature < 2°C or > 8°C
- Ensure temperature values are numbers, not strings
- Check Dashboard alerts panel for generated alerts

## Data Management

### Clear Custom Data

To remove your custom data and use default sample data:

1. Open browser console (F12)
2. Type: `localStorage.removeItem('custom_telemetry_data')`
3. Press Enter
4. Refresh the page

### Export for Sharing

1. Click "Download JSON" button
2. Share the downloaded file
3. Others can import it using "JSON Import" tab

### Backup Your Data

Regularly download your data as JSON to prevent loss:
- Click "Download JSON" after adding records
- Save the file to a safe location
- Import it later if needed

## Advanced Features

### Batch Import

Use the data generator script to create large datasets:

```bash
node scripts/generate-sample-data.js > my-data.txt
```

Copy the telemetry section and import via JSON Import tab.

### Custom Device IDs

You can use any device ID:
- `truck_01`, `truck_02`, `truck_03`
- `van_01`, `van_02`
- `storage_01`, `storage_02`

### Multiple Routes

Create different routes by:
1. Creating first route
2. Download JSON
3. Clear data
4. Create second route
5. Download JSON
6. Combine both JSON files manually

## Best Practices

1. **Start Simple**: Begin with 3-5 waypoints
2. **Test Incrementally**: Add a few records, test, then add more
3. **Save Frequently**: Click "Save Data" after adding records
4. **Download Backups**: Export JSON regularly
5. **Validate Data**: Check preview before saving
6. **Use Realistic Values**: Follow temperature and speed guidelines

## Integration with Other Pages

### Dashboard Integration

Your uploaded data will appear in:
- Temperature card (latest value)
- Humidity card (latest value)
- Pressure card (latest value)
- Speed card (latest value)
- Door status card (latest value)
- 24-hour charts (all records)

### Tracking Page Integration

Your route will be displayed on the map:
- Polyline showing complete route
- Animated marker following the path
- Playback controls to navigate through time
- Color-coded markers for events

### Device Detail Integration

Full telemetry history will be available:
- Charts tab: Temperature, humidity, pressure trends
- Door Events tab: All door open/close events
- Raw Data tab: Complete JSON records

## Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify JSON format using https://jsonlint.com
3. Review this guide for common solutions
4. Check DATA_FORMAT_GUIDE.md for detailed specifications

---

**Quick Reference:**

- **Safe Temperature**: 2-8°C
- **Coordinate Format**: Decimal degrees
- **Speed**: km/h
- **Course**: 0-360 degrees
- **Door Status**: "open" or "closed"

**Ready to Upload Your Data?**

1. ✅ Navigate to Data Upload page
2. ✅ Enter your telemetry data
3. ✅ Click "Add Record" for each waypoint
4. ✅ Click "Save Data"
5. ✅ View your data in Dashboard and Tracking pages

**Your custom cold-chain monitoring data is now live!** 🚀
