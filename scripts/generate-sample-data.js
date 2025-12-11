/**
 * Sample Data Generator for Cold-Chain Monitoring Dashboard
 * 
 * This script generates sample telemetry data for a route from start to destination.
 * Customize the route coordinates and parameters below.
 * 
 * Usage: node scripts/generate-sample-data.js
 */

// Configuration
const CONFIG = {
  deviceId: 'truck_01',
  startTime: new Date('2024-12-10T08:00:00Z'),
  intervalMinutes: 5,
  
  // Route: San Francisco to Los Angeles (example)
  // Replace with your own coordinates
  route: [
    { lat: 37.7749, lng: -122.4194, name: 'San Francisco, CA (Start)' },
    { lat: 37.5000, lng: -122.3000, name: 'Waypoint 1' },
    { lat: 37.2000, lng: -122.1000, name: 'Waypoint 2' },
    { lat: 36.7783, lng: -119.4179, name: 'Fresno, CA' },
    { lat: 35.3733, lng: -119.0187, name: 'Bakersfield, CA' },
    { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, CA (End)' },
  ],
  
  // Temperature settings
  temperature: {
    normal: 5.0,
    variation: 0.5,
    alertThreshold: { min: 2.0, max: 8.0 }
  },
  
  // Speed settings (km/h)
  speed: {
    highway: 80,
    city: 40,
    stopped: 0
  }
};

// Helper function to calculate bearing between two points
function calculateBearing(lat1, lon1, lat2, lon2) {
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
  const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
            Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
}

// Helper function to interpolate between two points
function interpolatePoints(start, end, steps) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps;
    points.push({
      lat: start.lat + (end.lat - start.lat) * ratio,
      lng: start.lng + (end.lng - start.lng) * ratio
    });
  }
  return points;
}

// Generate telemetry data
function generateTelemetryData() {
  const telemetry = [];
  let currentTime = new Date(CONFIG.startTime);
  
  // Interpolate route to create more points
  const detailedRoute = [];
  for (let i = 0; i < CONFIG.route.length - 1; i++) {
    const interpolated = interpolatePoints(CONFIG.route[i], CONFIG.route[i + 1], 10);
    detailedRoute.push(...interpolated);
  }
  
  detailedRoute.forEach((point, index) => {
    const nextPoint = detailedRoute[index + 1];
    const isLastPoint = index === detailedRoute.length - 1;
    
    // Calculate bearing
    const bearing = nextPoint 
      ? calculateBearing(point.lat, point.lng, nextPoint.lat, nextPoint.lng)
      : 180;
    
    // Determine speed
    let speed = CONFIG.speed.highway;
    if (index === 0 || isLastPoint) {
      speed = CONFIG.speed.stopped;
    } else if (index % 20 === 0) {
      speed = CONFIG.speed.city;
    }
    
    // Generate temperature with variation
    const tempVariation = (Math.random() - 0.5) * CONFIG.temperature.variation * 2;
    const temperature = CONFIG.temperature.normal + tempVariation;
    
    // Door status (open at stops)
    const doorStatus = speed === 0 && index > 0 && index < detailedRoute.length - 1 
      ? 'open' 
      : 'closed';
    
    telemetry.push({
      timestamp: currentTime.toISOString(),
      device_id: CONFIG.deviceId,
      latitude: parseFloat(point.lat.toFixed(6)),
      longitude: parseFloat(point.lng.toFixed(6)),
      temperature: parseFloat(temperature.toFixed(1)),
      humidity: parseFloat((65 + Math.random() * 5).toFixed(1)),
      pressure: parseFloat((101 + Math.random() * 0.5).toFixed(1)),
      speed: parseFloat(speed.toFixed(1)),
      course_deg: Math.round(bearing),
      door_status: doorStatus
    });
    
    // Increment time
    currentTime = new Date(currentTime.getTime() + CONFIG.intervalMinutes * 60 * 1000);
  });
  
  return telemetry;
}

// Generate alerts based on telemetry
function generateAlerts(telemetry) {
  const alerts = [];
  let alertId = 1;
  
  telemetry.forEach((record) => {
    // Temperature alerts
    if (record.temperature < CONFIG.temperature.alertThreshold.min) {
      alerts.push({
        id: `alert_${String(alertId++).padStart(3, '0')}`,
        device_id: record.device_id,
        timestamp: record.timestamp,
        severity: 'critical',
        type: 'temperature',
        message: `Temperature below safe range: ${record.temperature}°C`
      });
    } else if (record.temperature > CONFIG.temperature.alertThreshold.max) {
      alerts.push({
        id: `alert_${String(alertId++).padStart(3, '0')}`,
        device_id: record.device_id,
        timestamp: record.timestamp,
        severity: 'critical',
        type: 'temperature',
        message: `Temperature exceeded safe range: ${record.temperature}°C`
      });
    }
    
    // Door open alerts (only during transit)
    if (record.door_status === 'open' && record.speed > 0) {
      alerts.push({
        id: `alert_${String(alertId++).padStart(3, '0')}`,
        device_id: record.device_id,
        timestamp: record.timestamp,
        severity: 'warning',
        type: 'door',
        message: 'Door opened during transit'
      });
    }
  });
  
  return alerts;
}

// Generate GeoJSON track
function generateGeoJSONTrack() {
  const coordinates = CONFIG.route.map(point => [point.lng, point.lat]);
  
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        },
        properties: {
          device_id: CONFIG.deviceId,
          route_name: `${CONFIG.route[0].name} to ${CONFIG.route[CONFIG.route.length - 1].name}`,
          start_location: CONFIG.route[0].name,
          end_location: CONFIG.route[CONFIG.route.length - 1].name,
          total_waypoints: CONFIG.route.length
        }
      }
    ]
  };
}

// Main execution
console.log('Generating sample data...\n');

const telemetry = generateTelemetryData();
const alerts = generateAlerts(telemetry);
const track = generateGeoJSONTrack();

console.log('=== TELEMETRY DATA ===');
console.log(`Total records: ${telemetry.length}`);
console.log(`Time span: ${telemetry[0].timestamp} to ${telemetry[telemetry.length - 1].timestamp}`);
console.log('\nFirst 3 records:');
console.log(JSON.stringify(telemetry.slice(0, 3), null, 2));
console.log('\n--- Copy the full telemetry data below ---');
console.log(JSON.stringify(telemetry, null, 2));

console.log('\n\n=== ALERTS DATA ===');
console.log(`Total alerts: ${alerts.length}`);
console.log(JSON.stringify(alerts, null, 2));

console.log('\n\n=== GEOJSON TRACK DATA ===');
console.log(JSON.stringify(track, null, 2));

console.log('\n\n=== INSTRUCTIONS ===');
console.log('1. Copy the telemetry data and paste it into a new Pastebin');
console.log('2. Copy the alerts data and paste it into a new Pastebin');
console.log('3. Copy the GeoJSON track data and paste it into a new Pastebin');
console.log('4. Get the raw URLs from Pastebin');
console.log('5. Update src/services/dataService.ts with your new URLs');
console.log('\nOr save the data to local files:');
console.log('- public/data/truck01.json (telemetry)');
console.log('- public/data/alerts.json (alerts)');
console.log('- public/data/track.json (track)');
