# Cold-Chain Monitoring Dashboard - Deployment Guide

## Quick Start

### Prerequisites
- Node.js >= 20
- npm >= 10 or pnpm

### Local Development

1. **Install Dependencies:**
```bash
npm install
# or
pnpm install
```

2. **Start Development Server:**
```bash
npm run dev -- --host 127.0.0.1
# or
npx vite --host 127.0.0.1
```

3. **Access the Application:**
- Open browser to: http://127.0.0.1:5173
- Login with any username/password
- Explore the dashboard, tracking, and device detail pages

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Configuration

### Google Maps API Key

**IMPORTANT:** Before deploying to production, you must replace the placeholder Google Maps API key.

1. Get your API key from: https://console.cloud.google.com/google/maps-apis
2. Open `src/components/map/TruckMap.tsx`
3. Replace the `GOOGLE_MAPS_API_KEY` constant with your actual key:

```typescript
const GOOGLE_MAPS_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
```

### Data Sources

The application fetches data from these Pastebin URLs:
- Truck 01: https://pastebin.com/raw/TS0pTjRN
- Truck 02: https://pastebin.com/raw/YzhyJ6GT
- Storage: https://pastebin.com/raw/ea9pcTtk
- Alerts: https://pastebin.com/raw/eZsbAFtU
- Track: https://pastebin.com/raw/zbKqRsmp

To use your own data:
1. Update the URLs in `src/services/dataService.ts`
2. Ensure your data matches the TypeScript interfaces in `src/types/index.ts`

## Deployment Options

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

### Static Hosting (GitHub Pages, AWS S3, etc.)

1. Build the project:
```bash
npm run build
```

2. Upload the contents of the `dist/` directory to your hosting provider

3. Configure your hosting to serve `index.html` for all routes (SPA routing)

## Environment Variables

For production deployment, you may want to use environment variables:

1. Create a `.env` file:
```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
VITE_API_BASE_URL=your_api_url_here
```

2. Update `src/components/map/TruckMap.tsx`:
```typescript
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
```

## Production Checklist

- [ ] Replace Google Maps API key with production key
- [ ] Update data source URLs if using custom backend
- [ ] Test all features in production build
- [ ] Configure proper authentication if needed
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure analytics if needed
- [ ] Test on multiple devices and browsers
- [ ] Verify responsive design
- [ ] Check performance metrics
- [ ] Set up SSL certificate (HTTPS)

## Troubleshooting

### Map Not Loading
- Verify Google Maps API key is valid
- Check browser console for errors
- Ensure Maps JavaScript API is enabled in Google Cloud Console

### Data Not Loading
- Check network tab for failed requests
- Verify Pastebin URLs are accessible
- Check CORS settings if using custom backend

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Check Node.js version: `node -v` (should be >= 20)

## Performance Optimization

### For Production
- Enable gzip compression on your server
- Use CDN for static assets
- Implement lazy loading for routes
- Optimize images and assets
- Enable browser caching

### Code Splitting
The application already uses React Router for code splitting by route.

## Security Considerations

### Current Implementation (Demo)
- Uses localStorage for authentication (not secure)
- No real authentication backend
- Accepts any username/password

### For Production
- Implement proper authentication (OAuth, JWT, etc.)
- Use secure session management
- Add HTTPS
- Implement rate limiting
- Add input validation and sanitization
- Use environment variables for sensitive data

## Monitoring and Analytics

Consider adding:
- Google Analytics or similar
- Error tracking (Sentry, Rollbar)
- Performance monitoring (Lighthouse CI)
- Uptime monitoring

## Support and Maintenance

### Updating Dependencies
```bash
npm update
# or
pnpm update
```

### Checking for Security Vulnerabilities
```bash
npm audit
npm audit fix
```

## License

This is a demo application. Modify as needed for your use case.

## Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Google Maps Platform](https://developers.google.com/maps)
- [Recharts Documentation](https://recharts.org)
