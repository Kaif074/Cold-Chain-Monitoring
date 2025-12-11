# Cold-Chain Monitoring Dashboard - Usage Guide

## Overview

This is a fully functional demo dashboard showcasing a cold-chain solution with real-time monitoring capabilities. The dashboard displays temperature, humidity, pressure, GPS tracking, alerts, door events, and vehicle idle time using sample data from Pastebin.

## Features

### 1. Login Page
- Simple authentication interface (demo mode - accepts any username/password)
- Redirects to main dashboard after successful login

### 2. Main Dashboard
- **Live Data Cards:**
  - Temperature with status indicators (green/yellow/red)
  - Humidity percentage
  - Pressure in kPa
  - Vehicle speed in km/h
  - Door status (open/closed)
  - Total idle time in minutes

- **24-Hour Trend Charts:**
  - Temperature chart with reference lines for safe range (2-8°C)
  - Humidity chart
  - Pressure chart

- **Recent Alerts Panel:**
  - Color-coded alerts (critical/warning/info)
  - Clickable cards that navigate to device details

### 3. Live Tracking Page
- **Interactive Google Maps:**
  - Animated moving marker representing truck location
  - Polyline trail showing vehicle path
  - Vehicle icon rotation based on course direction
  - Color-coded event markers:
    - Green: Normal operation
    - Yellow: Door open event
    - Red: Temperature out of range

- **Playback Controls:**
  - Play/Pause button
  - Time slider for navigation through history
  - Speed control (×1, ×2, ×5)
  - Skip forward/backward buttons
  - Current timestamp display

- **Status Panel:**
  - Real-time metrics at current playback position
  - Legend explaining marker colors

### 4. Device Detail Page
- **Summary Cards:**
  - Total telemetry records
  - Number of door events
  - Total idle time

- **Tabbed Interface:**
  - **Charts Tab:** Temperature, humidity, and pressure trends
  - **Door Events Tab:** Timeline of all door open/close events
  - **Raw Data Tab:** Complete telemetry data in JSON format

## Data Sources

The application fetches sample data from the following Pastebin URLs:
- Truck 01 Telemetry: https://pastebin.com/raw/TS0pTjRN
- Truck 02 Telemetry: https://pastebin.com/raw/YzhyJ6GT
- Static Cold Storage: https://pastebin.com/raw/ea9pcTtk
- Alerts Data: https://pastebin.com/raw/eZsbAFtU
- GeoJSON Track: https://pastebin.com/raw/zbKqRsmp

## Color Coding System

- **Green (Success):** Normal operating conditions
  - Temperature within 2-8°C range
  - Door closed
  - Normal operations

- **Yellow (Warning):** Warning state
  - Door open events
  - Minor deviations

- **Red (Critical):** Critical alerts
  - Temperature outside safe range (<2°C or >8°C)
  - Critical system alerts

## Navigation

The application includes a persistent header with:
- Logo and application name
- Navigation links to Dashboard and Live Tracking
- Logout button

## Technical Details

### Technology Stack
- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Maps:** @vis.gl/react-google-maps
- **Charts:** Recharts
- **Routing:** React Router v7
- **Theme:** Dark mode by default

### Data Processing
- Telemetry data is fetched from Pastebin and cached in memory
- Idle time is calculated by analyzing consecutive zero-speed records
- Door events are extracted by detecting state changes
- 24-hour data filtering for chart displays

### Authentication
- Demo authentication using localStorage
- No backend required
- Any username/password combination works

## Usage Instructions

1. **Login:**
   - Enter any username and password
   - Click "Sign In"

2. **Dashboard:**
   - View real-time metrics in cards
   - Scroll down to see 24-hour trend charts
   - Click on alert cards to view device details

3. **Live Tracking:**
   - Click "Live Tracking" in the header
   - Use playback controls to navigate through vehicle history
   - Adjust playback speed as needed
   - Observe color-coded markers for events

4. **Device Details:**
   - Access via alert cards or direct URL
   - Switch between Charts, Door Events, and Raw Data tabs
   - Expand raw data entries to see full JSON

5. **Logout:**
   - Click the "Logout" button in the header

## Notes

- This is a demonstration application using sample data
- No real-time data updates (data is static from Pastebin)
- Google Maps API key is a placeholder and needs to be replaced for production use
- All data processing happens on the frontend
- No backend or database required

## Future Enhancements

Potential improvements for production use:
- Real-time data streaming via WebSocket
- Multiple device support with device selection
- Alert notifications and email alerts
- Data export functionality (CSV, PDF)
- Historical data comparison
- Custom alert threshold configuration
- User management and role-based access
- Integration with actual IoT devices
- Cloud deployment with proper API keys
