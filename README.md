# AgriAdvisory Platform

A modern agricultural advisory platform providing AI-powered insights for crop planning, pest management, and financial services.

## Features

### 🌾 Crop Advisory Module
- **Crop Recommendations**: AI-powered crop selection based on soil, weather, and market data
- **Seasonal Advisories**: Timely action items for irrigation, fertilization, and pest control
- **Pest Predictions**: Predictive analytics for pest outbreak prevention with detailed mitigation strategies

### 💳 Credit & Insurance Module
- **Credit Eligibility Assessment**: AI-driven credit scoring with detailed factor breakdown
- **Loan Pre-approval**: Instant eligibility check with personalized loan terms
- **Insurance Plans**: Multiple crop insurance options with coverage comparison
- **Next Steps Guidance**: Clear workflow for application and approval process

### ☁️ Weather Intelligence
- **Server-side weather integration** with OpenWeatherMap via cached Vite middleware
- **Forecast snapshots & warning badges** rendered across the dashboard and stakeholder views
- **Resilient fallbacks** that gracefully switch to simulated weather data when live APIs are unavailable

### 🔗 Blockchain Traceability
- **Supply Chain Tracking**: Farm-to-fork traceability with cryptographic verification
- **QR Code Generation**: Generate scannable codes for batch tracking
- **Hash Chain Verification**: Immutable blockchain-style event logging with SHA-256 hashing
- **Event Timeline**: Chronological view of all supply chain steps from planting to retail
- **Integrity Verification**: Automated detection of any tampering or data modification
- **Educational UI**: Clear explanations of how blockchain traceability works

### 🗺️ Warehouse & Logistics Visibility Map
- **Interactive Geospatial View**: Leaflet-based map showing entire supply chain network
- **Warehouse Tracking**: Real-time capacity monitoring, temperature control, and commodity storage
- **Processing Units**: Throughput metrics, efficiency tracking, and batch management
- **Transport Routes**: Live tracking of shipments with progress indicators and status updates
- **Advanced Filtering**: Filter by commodity type, operational status, or entity type
- **Rich Tooltips**: Detailed information popups with capacity bars, metrics, and status badges
- **Status Indicators**: Color-coded markers and routes for instant visibility into operations

### 🎨 Landing Page
- **Modern Glassmorphism Design**: Backdrop-filter effects with smooth animations
- **Animated Prism Background**: Canvas-based particle system with mouse interaction
- **Theme Support**: Light/dark mode with persistent preferences
- **Accessibility First**: Respects prefers-reduced-motion and includes ARIA labels
- **Performance Optimized**: Automatic render suspension when tab is inactive
- **Cross-browser Compatible**: Graceful fallbacks for Safari, Firefox, and older browsers

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Maps**: Leaflet with React-Leaflet

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Weather API configuration

The platform reads live conditions from OpenWeatherMap via a lightweight Vite middleware exposed at `/api/weather`.

- Provide an API key through the `OPENWEATHER_API_KEY` environment variable when running `npm run dev` or `npm run preview`.
- Responses are cached in-memory for 10 minutes to minimise API calls during demos.
- When the key is missing or a request fails, the middleware automatically falls back to rich simulated data from `src/data/weatherMock.ts` so the experience remains uninterrupted.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
/
├── landing.html             # Landing page entry point
├── index.html               # React app entry point
├── public/
│   ├── js/
│   │   ├── prismRenderer.js     # Animated background effects
│   │   ├── glassEffect.js       # Glassmorphism effects
│   │   └── landing-theme.js     # Theme management
│   └── favicon.svg
├── src/
│   ├── components/      # Reusable React components
│   │   ├── LogisticsMap.tsx     # Interactive map component
│   │   └── MapLegend.tsx        # Map legend component
│   ├── data/            # Mock and fallback datasets
│   │   ├── logisticsGeoData.ts  # Geospatial logistics data
│   │   ├── traceabilityData.ts  # Blockchain demo batches
│   │   └── weatherMock.ts       # Weather fallback data
│   ├── hooks/           # Custom React hooks (e.g., weather data)
│   ├── pages/           # Main routed views
│   │   ├── Dashboard.tsx
│   │   ├── CropAdvisory.tsx
│   │   ├── CreditInsurance.tsx
│   │   ├── StakeholderDashboards.tsx  # Includes logistics map
│   │   ├── Marketplace.tsx
│   │   └── Traceability.tsx     # Blockchain traceability module
│   ├── types/           # Shared TypeScript interfaces
│   ├── utils/           # Formatting helpers and style utilities
│   │   └── blockchain.ts        # Hashing and verification utilities
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.tsx         # Application entry point
├── server/
│   └── weatherRoutes.ts # Vite middleware exposing cached weather API
└── docs/
    └── landing.md       # Landing page documentation
```

## Features Demo

### Crop Advisory
- View personalized crop recommendations with suitability scores
- Track seasonal advisories with priority levels
- Monitor pest predictions with preventive measures

### Credit & Insurance
- Check credit eligibility with detailed scoring
- Compare insurance plans with benefit breakdowns
- Follow guided application workflows

### Blockchain Traceability
- Create new production batches with QR codes
- View complete farm-to-fork journey for each batch
- Verify blockchain integrity with hash chain validation
- Understand how cryptographic hashing prevents supply chain fraud
- Track events like planting, harvesting, processing, and distribution

### Warehouse & Logistics Map
- Visualize entire supply chain network on an interactive map
- Track warehouse capacity utilization and temperature in real-time
- Monitor processing unit throughput and efficiency
- Follow active transport routes with live progress updates
- Filter by commodity types or operational status
- Click markers for detailed facility and shipment information

## Landing Page

The platform includes a modern, visually engaging landing page with animated effects and glassmorphism design.

### Accessing the Landing Page

**Development:**
```bash
npm run dev
# Visit http://localhost:5173/landing.html
```

**Production:**
```bash
npm run build
npm run start
# Visit http://localhost:3000/landing.html
```

### Key Features

- **Animated Prism Background**: Canvas-based particle system with 80 particles, connection lines, and mouse interaction
- **Glassmorphism Effects**: Modern backdrop-filter blur with hover animations and parallax movement
- **Light/Dark Theme**: Toggle between themes with persistent localStorage preferences
- **Accessibility**: Automatically respects `prefers-reduced-motion` system setting
- **Performance**: Pauses rendering when tab is hidden to save battery and CPU
- **Cross-browser**: Graceful fallbacks for Safari, Firefox, and browsers without backdrop-filter support

### Configuration

All visual parameters can be customized by editing configuration objects in the JavaScript modules:

**Particle System** (`public/js/prismRenderer.js`):
```javascript
PrismRenderer.CONFIG.particleCount = 80;        // Number of particles
PrismRenderer.CONFIG.baseSpeed = 0.3;           // Animation speed
PrismRenderer.CONFIG.connectionDistance = 120;  // Connection line distance
PrismRenderer.CONFIG.enableMouseInteraction = true;
```

**Glass Effects** (`public/js/glassEffect.js`):
```javascript
GlassEffect.CONFIG.blurAmount = 12;             // Backdrop blur intensity
GlassEffect.CONFIG.enableParallax = true;       // Mouse parallax effect
GlassEffect.CONFIG.parallaxStrength = 0.02;     // Parallax sensitivity
GlassEffect.CONFIG.hoverLiftAmount = 8;         // Hover lift distance
```

**Color Palette** (`landing.html` CSS):
```css
:root {
  --bg-primary: #ffffff;
  --accent-primary: #10b981;
  --accent-secondary: #3b82f6;
  --glass-bg: rgba(255, 255, 255, 0.7);
}
```

### Theme Management

The landing page automatically syncs with the user's theme preference:

- **localStorage persistence**: Theme choice saved across sessions
- **System preference detection**: Respects `prefers-color-scheme` media query
- **Smooth transitions**: All elements update dynamically on theme change
- **Consistent styling**: Theme state shared between landing page and React dashboard

**Storage Key:**
```javascript
const THEME_STORAGE_KEY = 'agri_advisory_theme_preference';
```

### Authentication Integration

The landing page checks for authentication and redirects accordingly:

```javascript
const AUTH_STORAGE_KEY = 'agri_advisory_auth_token';

// Auto-redirect authenticated users to dashboard
const authToken = localStorage.getItem(AUTH_STORAGE_KEY);
if (authToken) {
  window.location.href = '/';
}
```

**To integrate with your auth system:**
1. Update `AUTH_STORAGE_KEY` to match your implementation
2. Store auth token in localStorage after successful login
3. Landing page will automatically detect and redirect

### Performance & Accessibility

**Prefers-Reduced-Motion:**
- Animation loops do not start
- Static particle frame rendered
- All transitions disabled
- Parallax effects disabled

**Visibility API:**
- Rendering pauses when tab is hidden
- Automatic resume when tab becomes visible
- Saves battery on mobile devices
- Reduces CPU usage in background tabs

**Mobile Optimization:**
- Particle count automatically reduced by 50% on mobile
- Touch-friendly interaction areas
- Responsive design for all screen sizes
- Optimized for performance on lower-end devices

### Browser Support

| Browser | Version | Support | Notes |
|---------|---------|---------|-------|
| Chrome | 76+ | ✅ Full | All features supported |
| Safari | 9+ | ✅ Full | Requires -webkit- prefix |
| Firefox | 103+ | ✅ Full | Backdrop-filter enabled by default |
| Edge | 79+ | ✅ Full | Chromium-based |

**Fallback Behavior:**
- Older browsers without backdrop-filter support get solid semi-transparent backgrounds
- Canvas unsupported browsers fall back to static gradient
- All interactive features remain functional

### Font Loading

The landing page uses the **Inter** font family with optimized loading:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Strategy:**
- Preconnect to Google Fonts for faster DNS resolution
- `display=swap` ensures text visible during font load
- Only loads needed font weights (300-700)
- Falls back to system fonts if unavailable

### Build & Deployment

The landing page exists alongside the React dashboard:

**Build Output:**
```
dist/
├── landing.html              # Landing page
├── index.html                # React app
├── public/
│   └── js/
│       ├── prismRenderer.js  # Particle renderer
│       ├── glassEffect.js    # Glass effects
│       └── landing-theme.js  # Theme management
└── assets/                   # React bundles
```

**Deployment:**
- Upload entire `dist` folder to your hosting provider
- Configure routing to serve both `landing.html` and React SPA
- Set appropriate cache headers for static assets
- Consider minifying JavaScript files for production

### Detailed Documentation

For comprehensive documentation including customization examples, troubleshooting, and advanced configuration, see **[docs/landing.md](./docs/landing.md)**.

Topics covered:
- Complete configuration reference
- Color palette customization
- Animation parameter tuning
- Performance optimization tips
- Browser-specific fallback handling
- Authentication flow integration
- Deployment strategies

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Deployment

### Deploy to Render

This application is ready for deployment on Render with one-click setup:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

**Quick Steps:**
1. Push your code to GitHub
2. Connect repository to Render
3. Render detects `render.yaml` and auto-configures
4. Deploy completes in 5-10 minutes
5. Your app is live with a public URL!

📖 **Complete deployment guide:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions, troubleshooting, and best practices.

**Configuration files included:**
- `render.yaml` - Render Blueprint configuration
- `.env.example` - Environment variables template
- Production-ready build scripts in `package.json`

**Deployment Requirements:**
- Node.js 18+
- Free tier compatible (512MB RAM)
- No database required (uses mock data)
- Optional: OpenWeatherMap API key for live weather

### Production Build

Test production build locally before deploying:

```bash
# Build for production
npm run build

# Serve production build
npm run start

# Visit http://localhost:3000
```

## Demo Data

The application uses mock data to demonstrate functionality. In production, this would be replaced with real API calls to:
- Weather services
- Soil analysis systems
- Market price databases
- Credit scoring engines
- Insurance providers

Weather fallbacks used by the `/api/weather` endpoint are defined in `src/data/weatherMock.ts`.

## License

MIT
