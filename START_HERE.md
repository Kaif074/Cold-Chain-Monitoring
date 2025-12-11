# 🚀 START HERE - Quick Setup Checklist

## ✅ Setup Checklist (5 Minutes)

### Step 1: Install Dependencies ⏱️ 2 min
```bash
npm install
```

### Step 2: Get Google Maps API Key ⏱️ 3 min
1. Visit: https://console.cloud.google.com/google/maps-apis
2. Create project
3. Enable "Maps JavaScript API"
4. Create API key
5. Copy it

**Need help?** → [API_KEY_SETUP.md](./API_KEY_SETUP.md)

### Step 3: Configure Environment ⏱️ 30 sec
Edit `.env` file:
```env
VITE_GOOGLE_MAPS_API_KEY=paste_your_key_here
```

### Step 4: Start Application ⏱️ 30 sec
```bash
npm run dev
```

### Step 5: Open Browser ⏱️ 10 sec
Navigate to: `http://localhost:5173`

---

## 🎯 What to Test

### Dashboard Page
- [ ] All metric cards show values
- [ ] Charts display correctly
- [ ] Alerts panel works
- [ ] Click alert → goes to device page

### Tracking Page (Map)
- [ ] Map loads (not gray screen)
- [ ] Truck marker appears
- [ ] Play button works
- [ ] Route trail shows
- [ ] Current status updates

### Device Detail Page
- [ ] Data table displays
- [ ] Charts render
- [ ] Door events show
- [ ] JSON viewer works

---

## 🆘 Quick Troubleshooting

### Map Not Showing?
→ Check `.env` file has API key  
→ Restart server: `npm run dev`  
→ See: [API_KEY_SETUP.md](./API_KEY_SETUP.md)

### Data Not Loading?
→ Check browser console (F12)  
→ Verify internet connection  
→ See: [QUICK_START.md](./QUICK_START.md)

### Other Issues?
→ See: [FINAL_SUMMARY.md](./FINAL_SUMMARY.md)

---

## 📚 Documentation Quick Links

**Just Starting?**
- [API_KEY_SETUP.md](./API_KEY_SETUP.md) - Get Maps working
- [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) - See what to expect

**Want to Customize?**
- [QUICK_START.md](./QUICK_START.md) - Add your own data
- [DATA_FORMAT_GUIDE.md](./DATA_FORMAT_GUIDE.md) - Data specs

**Need Details?**
- [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) - Full setup guide
- [FINAL_SUMMARY.md](./FINAL_SUMMARY.md) - Everything explained

---

## 🇮🇳 India Configuration

**Default Location**: New Delhi  
**Coordinates**: 28.6139°N, 77.2090°E  
**Auto-centers on your data when loaded**

---

## ✨ Features You'll Get

✅ Real-time temperature monitoring  
✅ Interactive map with GPS tracking  
✅ Animated truck markers  
✅ Playback controls  
✅ Alert system  
✅ Data upload  
✅ Charts and visualizations  

---

## 🎉 Ready to Start?

1. ✅ Run `npm install`
2. ✅ Get API key → Add to `.env`
3. ✅ Run `npm run dev`
4. ✅ Open `http://localhost:5173`
5. ✅ Start monitoring! 🚛

**Total Time**: 5 minutes

---

**Questions?** Check [FINAL_SUMMARY.md](./FINAL_SUMMARY.md) for complete documentation.
