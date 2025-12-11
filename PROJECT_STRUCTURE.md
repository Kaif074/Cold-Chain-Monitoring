# Cold-Chain Monitoring Dashboard - Project Structure

## Overview
This document provides a detailed overview of the project structure and key files.

## Directory Structure

```
/workspace/app-85j7ce9c8ikh/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── MetricCard.tsx          # Reusable metric display card
│   │   │   ├── AlertCard.tsx           # Alert notification card
│   │   │   ├── TemperatureChart.tsx    # Temperature trend chart
│   │   │   ├── HumidityChart.tsx       # Humidity trend chart
│   │   │   └── PressureChart.tsx       # Pressure trend chart
│   │   ├── map/
│   │   │   ├── TruckMap.tsx            # Google Maps integration with markers
│   │   │   └── PlaybackControls.tsx    # Playback control interface
│   │   ├── common/
│   │   │   └── Header.tsx              # Navigation header
│   │   └── ui/                         # shadcn/ui components
│   ├── pages/
│   │   ├── Login.tsx                   # Login page
│   │   ├── Dashboard.tsx               # Main dashboard page
│   │   ├── Tracking.tsx                # Live tracking page
│   │   └── DeviceDetail.tsx            # Device detail page
│   ├── services/
│   │   └── dataService.ts              # Data fetching and processing
│   ├── types/
│   │   └── index.ts                    # TypeScript type definitions
│   ├── App.tsx                         # Main app component with routing
│   ├── routes.tsx                      # Route configuration
│   ├── index.css                       # Global styles and design tokens
│   └── main.tsx                        # Application entry point
├── public/
│   └── favicon.png                     # Application icon
├── index.html                          # HTML entry point
├── package.json                        # Dependencies and scripts
├── tailwind.config.js                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── vite.config.ts                      # Vite build configuration
├── README.md                           # Project documentation
├── USAGE.md                            # Usage guide
├── PROJECT_STRUCTURE.md                # This file
└── TODO.md                             # Implementation checklist
```

## Key Files

### Pages

#### Login.tsx
- Simple authentication interface
- Uses localStorage for session management
- Redirects to dashboard on successful login

#### Dashboard.tsx
- Main dashboard with live metrics
- Displays 6 metric cards (temperature, humidity, pressure, speed, door status, idle time)
- Shows 24-hour trend charts
- Lists recent alerts with click-to-detail functionality

#### Tracking.tsx
- Google Maps integration with animated playback
- Playback controls (play/pause, speed, slider)
- Real-time status panel
- Color-coded event markers

#### DeviceDetail.tsx
- Tabbed interface (Charts, Door Events, Raw Data)
- Summary statistics
- Complete telemetry history
- Door event timeline

### Components

#### MetricCard.tsx
- Reusable card for displaying metrics
- Status-based color coding (success/warning/critical)
- Icon support with Lucide React

#### AlertCard.tsx
- Displays alerts with severity-based styling
- Clickable for navigation to device details
- Timestamp and device ID display

#### Chart Components
- TemperatureChart.tsx: Line chart with reference lines for safe range
- HumidityChart.tsx: Line chart for humidity trends
- PressureChart.tsx: Line chart for pressure trends
- All use Recharts library with custom tooltips

#### TruckMap.tsx
- Google Maps integration using @vis.gl/react-google-maps
- Animated marker with rotation based on course
- Polyline trail showing vehicle path
- Color-coded event markers (door open, temperature alerts)

#### PlaybackControls.tsx
- Play/pause functionality
- Time slider for navigation
- Speed control (×1, ×2, ×5)
- Skip forward/backward buttons

#### Header.tsx
- Navigation bar with logo
- Links to Dashboard and Live Tracking
- Logout button

### Services

#### dataService.ts
- Fetches telemetry data from Pastebin URLs
- Caches data in memory
- Provides utility functions:
  - `fetchTelemetry()`: Fetch device telemetry
  - `fetchAlerts()`: Fetch alerts
  - `fetchTrack()`: Fetch GeoJSON track data
  - `getLatestTelemetry()`: Get most recent data point
  - `calculateIdleTime()`: Calculate vehicle idle time
  - `getDoorEvents()`: Extract door open/close events
  - `filterTelemetryByTimeRange()`: Filter data by time

### Types

#### index.ts
- `TelemetryData`: Telemetry record structure
- `Alert`: Alert notification structure
- `GeoJSONTrack`: GeoJSON track data structure
- `DeviceInfo`: Device information structure

### Styling

#### index.css
- Design system with CSS custom properties
- Dark theme color tokens
- Success (green), warning (yellow), critical (red) colors
- Chart colors and semantic tokens

#### tailwind.config.js
- Extended color palette with semantic tokens
- Custom animations (fade-in, slide-in)
- Container queries support
- Border utilities

## Data Flow

1. **Login:** User enters credentials → Stored in localStorage → Redirect to dashboard
2. **Dashboard:** Fetch telemetry and alerts → Display metrics and charts → Click alert → Navigate to device detail
3. **Tracking:** Fetch telemetry → Initialize map → Playback controls update marker position → Display current status
4. **Device Detail:** Fetch telemetry → Calculate statistics → Display in tabs

## Authentication Flow

1. User visits root URL → Redirected to /login
2. User enters any username/password → Stored in localStorage
3. Protected routes check localStorage → Allow access if authenticated
4. Logout clears localStorage → Redirects to login

## State Management

- React hooks (useState, useEffect) for local state
- No global state management library (not needed for this demo)
- Data caching in dataService class

## Routing

- React Router v7 for navigation
- Protected routes with authentication check
- Routes defined in routes.tsx
- Dynamic routing for device detail (/device/:deviceId)

## Styling Approach

- Tailwind CSS for utility-first styling
- shadcn/ui for pre-built components
- Dark theme by default
- Semantic color tokens for consistency
- Responsive design with mobile-first approach

## Build and Development

- **Development:** `npm run dev -- --host 127.0.0.1`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Type Check:** TypeScript strict mode enabled

## Dependencies

### Core
- React 18
- TypeScript
- Vite

### UI
- Tailwind CSS
- shadcn/ui components
- Lucide React (icons)
- next-themes (theme management)

### Data Visualization
- Recharts (charts)
- @vis.gl/react-google-maps (maps)

### Utilities
- date-fns (date formatting)
- sonner (toast notifications)
- React Router (routing)

## Notes

- No backend required - all data processing on frontend
- Data fetched from Pastebin URLs
- Google Maps API key needs to be replaced for production
- Demo authentication - no real security
- All TypeScript types are strictly defined
- Responsive design works on all screen sizes
