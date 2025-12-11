# Welcome to Your Miaoda Project
Miaoda Application Link URL
    URL:https://medo.dev/projects/app-85j7ce9c8ikh

# Cold-Chain Monitoring Dashboard

A fully functional demo dashboard showcasing a cold-chain solution with real-time monitoring capabilities, GPS tracking, and interactive maps.

## ✅ Status: READY TO USE!

**Google Maps API Key**: ✅ Configured  
**Default Location**: 🇮🇳 New Delhi, India  
**All Features**: ✅ Working

## 🚀 Quick Start (2 Commands)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

**That's it!** The Google Maps API key is already configured in the `.env` file.

---

## 📖 Documentation Quick Links

- **[START_HERE.md](./START_HERE.md)** - Quick setup checklist
- **[API_KEY_CONFIGURED.md](./API_KEY_CONFIGURED.md)** - API key configuration details
- **[VISUAL_GUIDE.md](./VISUAL_GUIDE.md)** - See what to expect
- **[FINAL_SUMMARY.md](./FINAL_SUMMARY.md)** - Complete documentation

---

## ✨ Features

### 📊 Dashboard
- Real-time temperature, humidity, pressure monitoring
- Vehicle speed and door status tracking
- Idle time calculation
- 24-hour trend charts
- Color-coded alerts (🟢 green / 🟡 yellow / 🔴 red)

### 🗺️ Live Tracking
- Interactive Google Maps integration
- Animated truck marker with rotation
- Route polyline (breadcrumb trail)
- Playback controls (play/pause/speed)
- Time slider for navigation
- Event markers (door open, temperature alerts)

### 📱 Device Details
- Full telemetry data table
- Temperature/Humidity/Pressure charts
- Door events timeline
- Idle time display
- Raw JSON data viewer

---

## 🇮🇳 India Configuration

The map is configured for India with New Delhi as the default center:
- **Coordinates**: 28.6139°N, 77.2090°E
- **Zoom Level**: 12
- **Auto-centers**: Automatically centers on your data when loaded

---

## Project Info

## Project Directory

```
├── README.md # Documentation
├── components.json # Component library configuration
├── eslint.config.js # ESLint configuration
├── index.html # Entry file
├── package.json # Package management
├── postcss.config.js # PostCSS configuration
├── public # Static resources directory
│   ├── favicon.png # Icon
│   └── images # Image resources
├── src # Source code directory
│   ├── App.tsx # Entry file
│   ├── components # Components directory
│   ├── context # Context directory
│   ├── db # Database configuration directory
│   ├── hooks # Common hooks directory
│   ├── index.css # Global styles
│   ├── layout # Layout directory
│   ├── lib # Utility library directory
│   ├── main.tsx # Entry file
│   ├── routes.tsx # Routing configuration
│   ├── pages # Pages directory
│   ├── services # Database interaction directory
│   ├── types # Type definitions directory
├── tsconfig.app.json # TypeScript frontend configuration file
├── tsconfig.json # TypeScript configuration file
├── tsconfig.node.json # TypeScript Node.js configuration file
└── vite.config.ts # Vite configuration file
```

## Tech Stack

Vite, TypeScript, React, Supabase

## Development Guidelines

### How to edit code locally?

You can choose [VSCode](https://code.visualstudio.com/Download) or any IDE you prefer. The only requirement is to have Node.js and npm installed.

### Environment Requirements

```
# Node.js ≥ 20
# npm ≥ 10
Example:
# node -v   # v20.18.3
# npm -v    # 10.8.2
```

### Installing Node.js on Windows

```
# Step 1: Visit the Node.js official website: https://nodejs.org/, click download. The website will automatically suggest a suitable version (32-bit or 64-bit) for your system.
# Step 2: Run the installer: Double-click the downloaded installer to run it.
# Step 3: Complete the installation: Follow the installation wizard to complete the process.
# Step 4: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### Installing Node.js on macOS

```
# Step 1: Using Homebrew (Recommended method): Open Terminal. Type the command `brew install node` and press Enter. If Homebrew is not installed, you need to install it first by running the following command in Terminal:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
Alternatively, use the official installer: Visit the Node.js official website. Download the macOS .pkg installer. Open the downloaded .pkg file and follow the prompts to complete the installation.
# Step 2: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### After installation, follow these steps:

```
# Step 1: Download the code package
# Step 2: Extract the code package
# Step 3: Open the code package with your IDE and navigate into the code directory
# Step 4: In the IDE terminal, run the command to install dependencies: npm i
# Step 5: In the IDE terminal, run the command to start the development server: npm run dev -- --host 127.0.0.1
# Step 6: if step 5 failed, try this command to start the development server: npx vite --host 127.0.0.1
```

### How to develop backend services?

Configure environment variables and install relevant dependencies.If you need to use a database, please use the official version of Supabase.

## Learn More

You can also check the help documentation: Download and Building the app（ [https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en](https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en)）to learn more detailed content.
