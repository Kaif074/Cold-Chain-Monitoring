# Google Maps API Setup Guide

## Overview
The Cold-Chain Monitoring Dashboard uses Google Maps to display real-time truck tracking with animated markers and route visualization. To use this feature, you need to configure a Google Maps API key.

## Why You Need an API Key
Google Maps requires an API key to:
- Display interactive maps
- Show markers and routes
- Enable map controls and interactions
- Track usage and billing (Google provides $200 free credit per month)

## Step-by-Step Setup Instructions

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top
4. Click "New Project"
5. Enter a project name (e.g., "Cold-Chain Dashboard")
6. Click "Create"

### 2. Enable Maps JavaScript API

1. In the Google Cloud Console, go to [APIs & Services > Library](https://console.cloud.google.com/apis/library)
2. Search for "Maps JavaScript API"
3. Click on "Maps JavaScript API"
4. Click the "Enable" button
5. Wait for the API to be enabled (usually takes a few seconds)

### 3. Create API Credentials

1. Go to [APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" at the top
3. Select "API Key"
4. Your API key will be created and displayed
5. **Important**: Copy the API key immediately

### 4. Secure Your API Key (Recommended)

For production use, you should restrict your API key:

1. Click on the API key you just created
2. Under "Application restrictions":
   - For development: Select "None"
   - For production: Select "HTTP referrers" and add your domain
3. Under "API restrictions":
   - Select "Restrict key"
   - Check "Maps JavaScript API"
4. Click "Save"

### 5. Configure Your Application

1. Open the `.env` file in the root directory of the project
2. Add your API key:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyC-your-actual-api-key-here
   ```
3. Save the file

### 6. Restart the Development Server

After updating the `.env` file, you must restart the development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## Default Location

The map is configured with India as the default location:
- **Default Center**: New Delhi (28.6139°N, 77.2090°E)
- **Default Zoom**: 12

When telemetry data is loaded, the map automatically centers on the first data point.

## Troubleshooting

### Error: "AuthFailure"
**Cause**: API key is missing, invalid, or not properly configured.

**Solutions**:
1. Verify the API key is correctly copied to `.env`
2. Ensure there are no extra spaces or quotes around the key
3. Check that "Maps JavaScript API" is enabled in Google Cloud Console
4. Restart the development server after updating `.env`

### Error: "RefererNotAllowedMapError"
**Cause**: API key restrictions don't allow your domain.

**Solutions**:
1. Go to Google Cloud Console > Credentials
2. Edit your API key
3. Under "Application restrictions", add your domain or select "None" for development

### Error: "ApiTargetBlockedMapError"
**Cause**: The API is not enabled for your project.

**Solutions**:
1. Go to [APIs & Services > Library](https://console.cloud.google.com/apis/library)
2. Search for "Maps JavaScript API"
3. Click "Enable"

### Map Shows Gray Screen
**Causes**:
- API key not configured
- Billing not enabled (for production use)
- Network connectivity issues

**Solutions**:
1. Check browser console for specific error messages
2. Verify API key is correct
3. Enable billing in Google Cloud Console (required after free trial)

## Billing Information

### Free Tier
Google Maps provides:
- **$200 free credit per month**
- Covers approximately 28,000 map loads per month
- No credit card required for development (with restrictions)

### Production Use
For production deployment:
1. Enable billing in Google Cloud Console
2. Set up budget alerts to monitor usage
3. Implement API key restrictions for security

### Cost Estimation
- **Maps JavaScript API**: $7 per 1,000 loads
- **With $200 credit**: ~28,500 free map loads per month
- Most small to medium applications stay within the free tier

## Security Best Practices

1. **Never commit API keys to version control**
   - The `.env` file is in `.gitignore`
   - Use `.env.example` for documentation

2. **Use API key restrictions**
   - Restrict by HTTP referrer for web apps
   - Restrict by API for backend services

3. **Monitor usage**
   - Set up billing alerts
   - Review usage reports regularly

4. **Rotate keys periodically**
   - Create new keys every 6-12 months
   - Delete old unused keys

## Alternative: Development Without API Key

If you don't want to set up Google Maps immediately, you can:
1. Use the sample data to test other features (Dashboard, Alerts, Device Details)
2. The map page will show a helpful error message with setup instructions
3. All other features work independently of the map

## Support Resources

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)

## Quick Reference

```env
# .env file structure
VITE_APP_ID=app-85j7ce9c8ikh
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Required API**: Maps JavaScript API  
**Default Location**: New Delhi, India (28.6139°N, 77.2090°E)  
**Free Tier**: $200/month (~28,000 map loads)  
**Documentation**: https://developers.google.com/maps/documentation/javascript

---

**Need Help?** Check the browser console for specific error messages and refer to the troubleshooting section above.
