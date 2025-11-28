# Cold-Chain Dashboard Demo Requirements Document

## 1. Application Overview

### 1.1 Application Name
Cold-Chain Monitoring Dashboard

### 1.2 Application Description
A fully functional demo dashboard showcasing a cold-chain solution with real-time monitoring capabilities. The dashboard displays temperature, humidity, pressure, GPS tracking, alerts, door events, and vehicle idle time using provided sample data. This is a demonstration-only application, not intended for production use.

### 1.3 Core Features
\n#### A) Login Page
- Simple authentication interface (fake login acceptable, no backend authentication required)
- Redirect to main dashboard after successful login

#### B) Main Dashboard
- **Live Data Cards:**
  - Temperature
  - Humidity
  - Pressure
  - Vehicle Speed\n  - Door Status
  - Last Updated Time
\n- **Charts:**
  - Temperature 24-hour trend chart
  - Humidity chart\n  - Pressure chart
\n- **Alerts Panel:**\n  - Display alerts with color coding (red/yellow)
  - Clickable cards to open device detail view

#### C) Google Maps Page (Main Showcase)
- Interactive map integration (Google Maps or Mapbox)
- Animated moving marker representing truck location
- Polyline (breadcrumbs) based on telemetry history
- Vehicle icon rotation based on course_deg value

- **Playback Controls:**
  - Play/Pause button
  - Time slider for navigation
  - Speed control (×1, ×2, ×5)

- **Visual Indicators:**
  - Yellow marker on door open event
  - Red marker on temperature out-of-range\n
#### D) Device Detail Page
- Full telemetry data table
- Temperature/Humidity/Pressure charts
- Door events timeline
- Idle time calculation display
- Raw JSON data viewer

## 2. Data Sources

### 2.1 Fake Sample Data
The following data sources must be loaded into local JSON files or embedded in the application:\n
- **Truck 01 Telemetry:** https://pastebin.com/raw/TS0pTjRN
- **Truck 02 Telemetry:** https://pastebin.com/raw/YzhyJ6GT\n- **Static Cold Storage Telemetry:** https://pastebin.com/raw/ea9pcTtk
- **Alerts Data:** https://pastebin.com/raw/eZsbAFtU
- **GeoJSON Track Data:** https://pastebin.com/raw/zbKqRsmp

Data includes: latitude, longitude, speed, course, temperature, humidity, pressure, door status, and timestamps.

## 3. Technical Requirements

### 3.1 Map Functionality
- Draw polyline from GeoJSON data
- Display animated marker with real-time position updates
- Synchronize marker position with telemetry array
- Implement color-coded markers based on events

### 3.2 Backend (Optional)
If backend is included, create a simple Node.js/Express API with the following endpoints:
- /api/telemetry/:device_id
- /api/alerts
- /api/track/:device_id

Data can be served from local JSON files.\n
### 3.3 Technology Stack
- Frontend: React or Next.js
- Styling: Tailwind CSS
- Maps: Google Maps or Mapbox\n- Backend (optional): Node.js/Express\n\n## 4. Design Style

- **Color Scheme:** Green for normal status, yellow for warnings, red for critical alerts; dark background with high-contrast data displays
- **Visual Details:** Card-based layout with subtle shadows and rounded corners; smooth animations for marker movement and chart transitions
- **Overall Layout:** Grid-based dashboard layout with responsive breakpoints; sidebar navigation for page switching; full-width map view with overlay controls
- **Dark Mode:** Preferred but optional\n
## 5. Deliverables

### 5.1 Code Structure
- Complete folder structure\n- All React pages and components\n- Map component with playback functionality
- Chart components
- Sample API routes (if backend included)
\n### 5.2 Documentation
- Instructions to run the project
- Brief explanation of architecture
- Deployment guide for Vercel/Netlify (optional)
- Suggested improvements\n
### 5.3 Additional Features (Optional)
- Downloadable ZIP folder
- Realistic temperature anomaly simulation
- Cloud deployment instructions
\n## 6. Color Coding System
- **Green:** Normal operating conditions
- **Yellow:** Warning state
- **Red:** Critical alert\n\n## 7. Responsive Design
The application must be fully responsive across desktop, tablet, and mobile devices.