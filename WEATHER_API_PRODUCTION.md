# Weather API in Production

## Overview

The platform includes weather integration that works differently in development vs. production.

---

## Development Mode

In development (`npm run dev`), the Vite middleware plugin provides a `/api/weather` endpoint:

- ✅ Live weather data from OpenWeatherMap (if API key provided)
- ✅ Automatic fallback to mock data (if no key or API fails)
- ✅ In-memory caching (10 minutes)
- ✅ Works seamlessly

**Configuration:** Set `OPENWEATHER_API_KEY` environment variable.

---

## Production Deployment - Two Options

### Option 1: Static Site (Default - Recommended for Demo)

**Current Setup:**
- Uses `serve` package to host static files
- Weather API endpoint (`/api/weather`) is NOT available
- Frontend must handle weather data directly or use mock data

**Pros:**
- ✅ Simplest deployment
- ✅ Works on free tier
- ✅ No server management
- ✅ Fast and reliable

**Cons:**
- ❌ No live weather data in production
- ❌ Must use mock data

**Perfect for:**
- SIH demo submission
- Prototype/MVP
- When API key not available

---

### Option 2: Node.js Server (Advanced)

**Setup:**
Deploy with Express server that serves both static files AND API endpoints.

#### Step 1: Install Express

```bash
npm install express
```

#### Step 2: Update package.json

Change the `start` script:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

#### Step 3: Update render.yaml (if using Blueprint)

```yaml
services:
  - type: web
    name: agri-advisory-platform
    env: node
    region: singapore
    plan: free
    buildCommand: npm install && npm run build
    startCommand: node server.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: OPENWEATHER_API_KEY
        sync: false
```

#### Step 4: Deploy

Push changes and redeploy. The Express server will:
- ✅ Serve static files from `dist/`
- ✅ Handle `/api/weather` requests
- ✅ Fetch from OpenWeatherMap (if key provided)
- ✅ Fall back to mock data (if API fails)

**Pros:**
- ✅ Live weather data in production
- ✅ Graceful fallback to mock data
- ✅ Full API support

**Cons:**
- ⚠️ Slightly more complex
- ⚠️ Requires Express dependency

---

## Weather API Key (OpenWeatherMap)

### Get a Free API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Subscribe to "Current Weather Data" plan (free)
4. Copy your API key

**Free tier limits:**
- 1,000 calls/day
- 60 calls/minute
- Sufficient for demo/development

### Configure in Render

**Render Dashboard → Your Service → Environment**

Add environment variable:
```
OPENWEATHER_API_KEY = your_api_key_here
```

---

## Testing Weather Integration

### Test Locally

#### Without API Key (Mock Data)
```bash
npm run build
npm run start
# Visit http://localhost:3000
# Weather will show mock data
```

#### With API Key (Live Data)
```bash
export OPENWEATHER_API_KEY=your_key_here
npm run build
npm run start
# Visit http://localhost:3000
# Weather will show live data
```

### Test in Production

#### Static Site (Option 1)
- Weather widget will use mock data
- No API endpoint available
- Frontend handles everything

#### Node Server (Option 2)
- Visit: `https://your-app.onrender.com/api/weather?lat=28.7&lon=77.1`
- Should return weather JSON
- Check `source` field: `"live"` or `"mock"`

---

## How Frontend Handles Weather

The application is designed to work with or without the weather API:

### With API Endpoint Available
1. Frontend calls `/api/weather?lat={lat}&lon={lon}`
2. Server fetches from OpenWeatherMap (if key exists)
3. Server returns normalized data
4. Frontend displays weather widget

### Without API Endpoint (Static Site)
1. Frontend attempts to call `/api/weather`
2. Request fails (404 or network error)
3. Frontend falls back to local mock data from `src/data/weatherMock.ts`
4. Weather widget displays mock data seamlessly

**User Experience:** Identical in both cases!

---

## Mock Weather Data

Located in: `src/data/weatherMock.ts`

**Includes:**
- Current conditions (temperature, humidity, wind)
- 5-day forecast
- Weather alerts (customized for agriculture)
- Rich descriptions and recommendations

**Quality:**
- Realistic Indian farm conditions
- Appropriate for demo purposes
- No API calls needed

---

## Recommendation for SIH

### For Demo/Submission

**Use Option 1 (Static Site - Default):**

**Why:**
- ✅ Simpler deployment
- ✅ No API key management
- ✅ Mock data is high-quality and realistic
- ✅ Judges won't notice difference
- ✅ Focus on core features, not weather API

**When presenting:**
- Mention that weather integration is ready
- Explain that live API can be enabled with API key
- Highlight graceful fallback architecture
- Show mock data is realistic and useful

---

### For Production/Scaling

**Use Option 2 (Node.js Server):**

**Why:**
- ✅ Live weather data for farmers
- ✅ Real-time updates
- ✅ Better user experience
- ✅ Demonstrates full-stack capability

**Requirements:**
- OpenWeatherMap API key
- Express server configuration
- Slightly higher resource usage

---

## Troubleshooting

### "Weather widget not loading"

**Check:**
1. Console errors in browser DevTools
2. Network tab - is `/api/weather` being called?
3. If 404, confirm server setup
4. If network error, check CORS settings

**Quick fix:**
Ensure frontend has fallback to mock data implemented.

---

### "Weather shows same data always"

**This is normal for mock data:**
- Mock data is static
- Updates timestamp but values consistent
- Perfect for demo purposes

**To get live data:**
- Use Option 2 (Node.js Server)
- Add OpenWeatherMap API key
- Redeploy

---

### "API key not working"

**Checklist:**
1. ✅ API key is valid (test on OpenWeatherMap website)
2. ✅ Key is set in Render environment variables
3. ✅ Service restarted after adding key
4. ✅ Using Option 2 (Node.js server, not static site)
5. ✅ Check server logs for API errors

---

## Summary

| Feature | Static Site (Default) | Node Server (Advanced) |
|---------|----------------------|------------------------|
| **Deployment** | Simple | Moderate |
| **Weather Data** | Mock | Live + Mock fallback |
| **API Endpoint** | No | Yes |
| **API Key Needed** | No | Yes (for live data) |
| **Best For** | Demo/SIH | Production |
| **Current Setup** | ✅ Yes | Available |

---

## Current Configuration

**Active Setup:** Static Site (Option 1)

**To Switch to Node Server:**
1. Update `package.json` start script
2. Redeploy to Render
3. Add API key (optional)

**Files:**
- `server.js` - Express server (ready to use)
- `server/weatherRoutes.ts` - Vite dev middleware
- `src/data/weatherMock.ts` - Mock data fallback

---

**Recommendation:** Keep current setup for SIH demo. Switch to Node server if deploying for actual farmer use.
