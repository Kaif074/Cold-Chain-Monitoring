# Cold-Chain Monitoring Dashboard Requirements Document

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
  - Temperature Card: Display current temperature value with unit (°C or °F), color-coded background (green for normal, red for out-of-range)
  - Humidity Card: Display current humidity percentage with icon\n  - Pressure Card: Display current pressure value with unit (hPa or PSI)
  - Vehicle Speed Card: Display current speed in km/h or mph
  - Door Status Card: Display'Open' or 'Closed' status with color indicator
  - Location Card: Display current GPS coordinates (latitude, longitude) and destination address
  - Last Updated Time Card: Display timestamp of latest data update
\n- **Data Upload Section:**
  - File upload button to allow users to upload custom telemetry JSON files
  - Supported formats: JSON files matching the telemetry data structure
  - Upload validation to ensure correct data format
  - Success/error message display after upload attempt
  - Uploaded data should replace current dashboard data dynamically

- **Charts:**
  - Temperature 24-hour trend chart\n  - Humidity chart
  - Pressure chart\n\n- **Alerts Panel:**
  - Display alerts with color coding (red/yellow)\n  - Clickable cards to open device detail view
\n#### C) Google Maps Live Tracking Page (Main Showcase)
- **Real-time Data Cards (Side Panel):**
  - Temperature Card: Show current temperature at marker position
  - Humidity Card: Show current humidity at marker position
  - Pressure Card: Show current pressure at marker position
  - Location Card: Show current GPS coordinates and estimated time to destination
  - Vehicle Speed Card: Show current vehicle speed
  - Door Status Card: Show current door status\n\n- **Data Upload Feature:**
  - Upload button in side panel to load custom route/telemetry data
  - Support for JSON and GeoJSON formats
  - Real-time map update after successful upload
\n- **Google Maps Integration:**
  - Use Google Maps JavaScript API for map rendering
  - API key configuration in environment variables (.env file)
  - Interactive map with zoom and pan controls

- **Route Visualization:**
  - Define origin and destination points
  - Display full route polyline from start to end location
  - Animated moving marker representing truck location along the route
  - Vehicle icon rotation based on course_deg value from telemetry data

- **Real-time Data Display:**
  - Info window showing current temperature, humidity, and pressure when clicking on marker
  - Side panel displaying live metrics synchronized with marker position
\n- **Playback Controls:**
  - Play/Pause button for route animation
  - Time slider for navigation through historical data
  - Speed control buttons (×1, ×2, ×5)\n  - Skip forward/backward buttons for quick navigation

- **Visual Event Indicators:**
  - Yellow marker on door open event
  - Red marker on temperature out-of-range alert
  - Green marker for normal operation

- **Route Configuration:**
  - Input fields or dropdown to select origin location
  - Input fields or dropdown to select destination location\n  - 'Start Tracking' button to initiate route playback from origin to destination

#### D) Device Detail Page
- Full telemetry data table\n- Temperature/Humidity/Pressure charts
- Door events timeline
- Idle time calculation display
- Raw JSON data viewer

## 2. Data Sources and Integration

### 2.1 Data File Location
All sample data files should be stored in the following directory structure:

```
project-root/
├── public/
│   └── data/
│       ├── truck01_telemetry.json
│       ├── truck02_telemetry.json
│       ├── cold_storage_telemetry.json
│       ├── alerts.json
│       └── track_geojson.json
```

### 2.2 Data Sources
Download and save the following data into corresponding JSON files:

- **Truck 01 Telemetry:** https://pastebin.com/raw/TS0pTjRN → save as `truck01_telemetry.json`
- **Truck 02 Telemetry:** https://pastebin.com/raw/YzhyJ6GT → save as `truck02_telemetry.json`
- **Static Cold Storage Telemetry:** https://pastebin.com/raw/ea9pcTtk → save as `cold_storage_telemetry.json`
- **Alerts Data:** https://pastebin.com/raw/eZsbAFtU → save as `alerts.json`
- **GeoJSON Track Data:** https://pastebin.com/raw/zbKqRsmp → save as `track_geojson.json`

### 2.3 Data Loading Implementation
- Use fetch API or axios to load JSON files from `/data/` directory
- Parse telemetry data to extract: latitude, longitude, speed, course_deg, temperature, humidity, pressure, door status, and timestamps
- Store loaded data in React state or context for global access
- Implement file upload handler to accept user-uploaded JSON files and update application state

### 2.4 Temperature, Humidity, and Pressure Display
- Extract latest values from telemetry arrays for dashboard cards
- Use time-series data to populate24-hour trend charts
- Update values in real-time during map playback based on current marker position
- Display values in dedicated cards with appropriate units and visual indicators

### 2.5 Data Upload Functionality
- Implement file input component with drag-and-drop support
- Validate uploaded JSON structure matches expected telemetry format
- Parse and merge uploaded data with existing data or replace entirely based on user selection
- Display upload progress indicator and confirmation message
- Handle upload errors gracefully with clear error messages

## 3. Technical Requirements

### 3.1 Google Maps Integration
- **API Setup:**
  - Obtain Google Maps JavaScript API key from Google Cloud Console
  - Enable Maps JavaScript API and Directions API
  - Store API key in `.env` file: `REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key`

- **Map Implementation:**
  - Use @react-google-maps/api library for React integration
  - Initialize map centered on first telemetry coordinate
  - Set appropriate zoom level (10-12 for city-level view)
\n### 3.2 Route and Tracking Functionality
- **Origin to Destination:**
  - Extract first coordinate from telemetry data as origin
  - Extract last coordinate as destination
  - Draw polyline connecting all coordinates in sequence
  - Add origin marker (green) and destination marker (red flag)
\n- **Animated Marker:**
  - Create custom vehicle icon (truck SVG or PNG)\n  - Animate marker movement along polyline coordinates
  - Synchronize animation with telemetry timestamp intervals
  - Rotate marker icon based on course_deg field\n
- **Data Synchronization:**
  - Match marker position index with telemetry array index
  - Display corresponding temperature, humidity, and pressure values in side panel cards
  - Trigger event markers (yellow/red) based on door status and temperature thresholds

### 3.3 Backend (Optional)
If backend is included, create a simple Node.js/Express API with the following endpoints:
- `/api/telemetry/:device_id` - returns telemetry data for specified device
- `/api/alerts` - returns all alerts
- `/api/track/:device_id` - returns GeoJSON track data
- `/api/upload` - handles file upload and data processing

Data can be served from local JSON files in `server/data/` directory.
\n### 3.4 Technology Stack
- **Frontend:** React or Next.js\n- **Styling:** Tailwind CSS\n- **Maps:** Google Maps JavaScript API with @react-google-maps/api\n- **Charts:** Chart.js or Recharts
- **File Upload:** react-dropzone or native HTML5 file input
- **Backend (optional):** Node.js/Express\n
## 4. Design Style\n
- **Color Scheme:** Green for normal status, yellow for warnings, red for critical alerts; dark background (#1a1a1a) with high-contrast data displays
- **Card Design:** Elevated cards with subtle shadows (shadow-lg), rounded corners (rounded-xl), and hover effects (hover:shadow-2xl); each card displays metric name, value, unit, and status icon
- **Visual Details:** Smooth animations for marker movement (transition-all duration-300) and chart transitions; gradient backgrounds for cards based on status
- **Overall Layout:** Grid-based dashboard layout (grid-cols-3 for desktop, grid-cols-1 for mobile) with responsive breakpoints; sidebar navigation for page switching; full-width map view with overlay controls positioned at bottom-left
- **Map Styling:** Dark mode map theme using Google Maps styling API; custom marker icons with drop shadows; polyline with gradient color based on temperature data

## 5. Implementation Guide

### 5.1 Data Setup Steps
1. Create `public/data/` folder in project root
2. Download all five data files from Pastebin URLs
3. Save files with specified names in the data folder
4. Verify JSON format validity using online JSON validator
\n### 5.2 Google Maps Setup Steps
1. Go to Google Cloud Console (console.cloud.google.com)
2. Create new project or select existing project
3. Enable 'Maps JavaScript API' in API Library
4. Create API key in Credentials section
5. Add API key to `.env` file in project root
6. Install @react-google-maps/api: `npm install @react-google-maps/api`

### 5.3 Live Tracking Implementation\n1. Load telemetry JSON file using fetch in useEffect hook
2. Extract coordinates array and create polyline path
3. Set first coordinate as origin, last as destination
4. Implement playback state management (playing, paused, current index)
5. Use setInterval to increment marker position index based on speed setting
6. Update temperature/humidity/pressure display in side panel cards based on current index
7. Add event listeners to playback controls (play, pause, speed buttons, slider)
\n### 5.4 Data Upload Implementation
1. Create file input component with accept='application/json' attribute
2. Implement onChange handler to read uploaded file using FileReader API
3. Parse JSON content and validate structure
4. Update application state with new data\n5. Refresh dashboard cards and map visualization
6. Display success/error toast notification

## 6. Deliverables

### 6.1 Code Structure
- Complete folder structure with `/public/data/` directory
- All React pages and components
- Map component with Google Maps integration and playback functionality
- Chart components for temperature, humidity, and pressure\n- Data card components with real-time updates
- File upload component with validation
- Sample API routes (if backend included)

### 6.2 Documentation
- Instructions to run the project (npm install, npm start)
- Google Maps API key setup guide
- Data file placement instructions
- Data upload feature usage guide
- Brief explanation of architecture
- Deployment guide for Vercel/Netlify (optional)
- Suggested improvements\n
### 6.3 Additional Features (Optional)
- Downloadable ZIP folder with all code and data files
- Realistic temperature anomaly simulation\n- Cloud deployment instructions
- Multi-device selection dropdown
- Export data functionality
\n## 7. Color Coding System
- **Green:** Normal operating conditions (temperature within range, door closed)
- **Yellow:** Warning state (door open event)\n- **Red:** Critical alert (temperature out of range)\n\n## 8. Responsive Design
The application must be fully responsive across desktop (1920px), tablet (768px), and mobile (375px) devices. Map controls should stack vertically on mobile screens. Data cards should adapt to single-column layout on mobile devices.

## 9. Reference Images
- Dashboard layout reference: Screenshot2025-12-11at 9.57.32 AM.png
- Live tracking page reference: Screenshot 2025-12-11 at 9.57.43 AM.png