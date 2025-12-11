# 🗺️ Google Maps API Key - Quick Setup

## ⚡ Quick Fix (3 Steps)

### 1️⃣ Get Your API Key
Visit: https://console.cloud.google.com/google/maps-apis
- Create a project
- Enable "Maps JavaScript API"
- Create an API key
- Copy it

### 2️⃣ Add to .env File
Edit the `.env` file in the project root:
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyC-your-actual-api-key-here
```

### 3️⃣ Restart Server
```bash
# Stop the server (Ctrl+C)
npm run dev
```

## ✅ That's It!
The map should now work with India (New Delhi) as the default location.

---

## 📖 Need More Help?

**Detailed Guide**: See [GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md)

**Common Issues**:
- **AuthFailure**: API key is missing or invalid
- **RefererNotAllowed**: Add your domain to API restrictions
- **ApiTargetBlocked**: Enable "Maps JavaScript API"

**Free Tier**: $200/month credit (~28,000 map loads)

---

## 🇮🇳 India Location
Default map center: **New Delhi** (28.6139°N, 77.2090°E)

The map automatically centers on your data when loaded.
