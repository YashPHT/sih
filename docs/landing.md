# Landing Page Documentation

## Overview

The AgriAdvisory landing page provides a visually engaging entry point with modern glassmorphism effects and animated prism backgrounds. It's designed to be performant, accessible, and easily customizable while maintaining a professional appearance across all devices and browsers.

## Table of Contents

1. [Architecture](#architecture)
2. [Development & Preview](#development--preview)
3. [Customization Guide](#customization-guide)
4. [Performance & Accessibility](#performance--accessibility)
5. [Browser Support](#browser-support)
6. [Authentication Integration](#authentication-integration)
7. [Build & Deployment](#build--deployment)

---

## Architecture

### File Structure

```
/
├── landing.html                    # Main landing page
├── public/
│   ├── js/
│   │   ├── prismRenderer.js        # Animated background renderer
│   │   ├── glassEffect.js          # Glassmorphism effects
│   │   └── landing-theme.js        # Theme management
│   └── favicon.svg
└── docs/
    └── landing.md                  # This file
```

### Component Overview

**landing.html**
- Single-page entry point with inline styles
- Preloads Inter font family for optimal performance
- Contains theme toggle and glass card with CTA button
- Imports modular JavaScript for effects

**prismRenderer.js**
- Canvas-based animated particle background
- 80 particles (default) with connection lines
- Mouse interaction and parallax effects
- Automatic pause when tab inactive (Page Visibility API)
- Respects `prefers-reduced-motion`

**glassEffect.js**
- Applies glassmorphism (backdrop-filter blur)
- Hover lift effects and dynamic shadows
- Mouse-based parallax positioning
- Automatic fallback for unsupported browsers

**landing-theme.js**
- Theme state management (light/dark)
- localStorage persistence
- System preference detection

---

## Development & Preview

### Local Development

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Access landing page:**
   ```
   http://localhost:5173/landing.html
   ```

3. **Live reload:** Vite will automatically reload when you edit any landing page files.

### File Watching

The landing page is separate from the React app but uses the same Vite dev server. Any changes to:
- `landing.html`
- `public/js/prismRenderer.js`
- `public/js/glassEffect.js`
- `public/js/landing-theme.js`

...will trigger hot module replacement or full page reload.

### Production Preview

Build and preview the production version:

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Access landing page
# http://localhost:4173/landing.html
```

---

## Customization Guide

### Color Palette Variables

Edit colors in `landing.html` CSS or via JavaScript:

**CSS Variables (landing.html `<style>` section):**

```css
:root {
  /* Light theme */
  --bg-primary: #ffffff;           /* Page background */
  --bg-secondary: #f8fafb;         /* Secondary backgrounds */
  --text-primary: #0f172a;         /* Main text color */
  --text-secondary: #475569;       /* Muted text */
  --accent-primary: #10b981;       /* Primary accent (green) */
  --accent-secondary: #3b82f6;     /* Secondary accent (blue) */
  --glass-bg: rgba(255, 255, 255, 0.7);  /* Glass background */
  --glass-border: rgba(255, 255, 255, 0.18); /* Glass border */
}

[data-theme="dark"] {
  /* Dark theme overrides */
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... etc */
}
```

**JavaScript Color Configuration:**

**prismRenderer.js:**

```javascript
PrismRenderer.CONFIG.colors = {
  light: {
    particles: ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899'],
    connections: 'rgba(59, 130, 246, 0.15)',
    background: 'transparent'
  },
  dark: {
    particles: ['#34d399', '#60a5fa', '#a78bfa', '#f472b6'],
    connections: 'rgba(96, 165, 250, 0.2)',
    background: 'transparent'
  }
};
```

**glassEffect.js:**

```javascript
GlassEffect.CONFIG.colors = {
  light: {
    glassBase: 'rgba(255, 255, 255, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.18)',
    shadowColor: 'rgba(31, 38, 135, 0.15)'
  },
  dark: {
    glassBase: 'rgba(15, 23, 42, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    shadowColor: 'rgba(0, 0, 0, 0.3)'
  }
};
```

### Animation Toggles

**Disable/Enable Specific Effects:**

```javascript
// In landing.html <script> section or as separate config file

// Disable particle connections
PrismRenderer.CONFIG.enableConnections = false;

// Disable mouse interaction
PrismRenderer.CONFIG.enableMouseInteraction = false;

// Disable parallax
GlassEffect.CONFIG.enableParallax = false;

// Disable hover lift
GlassEffect.CONFIG.enableHoverLift = false;
```

**Adjust Animation Speed:**

```javascript
// Slower particle movement
PrismRenderer.CONFIG.baseSpeed = 0.1;

// Faster particle movement
PrismRenderer.CONFIG.baseSpeed = 0.8;

// More subtle parallax
GlassEffect.CONFIG.parallaxStrength = 0.01;

// More pronounced parallax
GlassEffect.CONFIG.parallaxStrength = 0.05;
```

### Particle Configuration

**prismRenderer.js CONFIG options:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `particleCount` | 80 | Number of particles (auto-reduces on mobile) |
| `particleSize` | 2.5 | Particle radius in pixels |
| `baseSpeed` | 0.3 | Movement speed multiplier |
| `connectionDistance` | 120 | Max distance for connection lines |
| `enableConnections` | true | Draw lines between particles |
| `enableMouseInteraction` | true | Particles react to cursor |
| `mouseRadius` | 150 | Mouse interaction radius |
| `mouseForce` | 0.15 | Mouse repulsion strength |
| `mobileParticleRatio` | 0.5 | Particle reduction on mobile (50%) |

**Example: High-performance mode for lower-end devices:**

```javascript
PrismRenderer.CONFIG.particleCount = 40;
PrismRenderer.CONFIG.enableConnections = false;
PrismRenderer.CONFIG.enableMouseInteraction = false;
```

### Glass Effect Configuration

**glassEffect.js CONFIG options:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `blurAmount` | 12 | Backdrop blur intensity (pixels) |
| `opacity` | 0.7 | Glass element opacity |
| `enableParallax` | true | Mouse parallax effect |
| `parallaxStrength` | 0.02 | Parallax sensitivity |
| `parallaxSmoothing` | 0.1 | Parallax easing factor |
| `enableShadows` | true | Dynamic shadows on hover |
| `enableHoverLift` | true | Lift effect on hover |
| `hoverLiftAmount` | 8 | Lift distance (pixels) |

**Example: Minimal glass effect:**

```javascript
GlassEffect.CONFIG.blurAmount = 8;
GlassEffect.CONFIG.enableParallax = false;
GlassEffect.CONFIG.enableHoverLift = false;
```

### Theme Styling

**Custom Theme Colors:**

Add new theme variants by editing the CSS in `landing.html`:

```css
[data-theme="custom"] {
  --bg-primary: #1a1a2e;
  --accent-primary: #16213e;
  --accent-secondary: #0f3460;
  /* ... etc */
}
```

Then apply programmatically:

```javascript
document.documentElement.setAttribute('data-theme', 'custom');
```

---

## Performance & Accessibility

### Prefers-Reduced-Motion Handling

Both `prismRenderer.js` and `glassEffect.js` respect the `prefers-reduced-motion` media query:

**Behavior when reduced motion is preferred:**

1. **Prism Renderer:**
   - Animation loop does not start
   - Single static frame of particles rendered
   - No CPU/battery usage from animation
   - Connection lines still visible (static)

2. **Glass Effect:**
   - All transitions disabled
   - Parallax effect completely disabled
   - Hover effects simplified or removed
   - Static glass appearance maintained

**Implementation:**

```javascript
// Automatically detected
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Dynamically responds to changes
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
  if (e.matches) {
    // Disable animations
  }
});
```

### Visibility-Based Render Suspension

**Page Visibility API Integration:**

The prism renderer automatically pauses when the page is hidden (tab switching, minimized window):

```javascript
// In prismRenderer.js
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    renderer.pause();  // Stop animation loop
  } else {
    renderer.resume(); // Resume when visible
  }
});
```

**Benefits:**
- Saves battery life on mobile devices
- Reduces CPU usage in background tabs
- Improves overall browser performance
- Automatic with zero configuration needed

**Manual Control:**

```javascript
const renderer = new PrismRenderer('prism-canvas');
renderer.start();

// Manually pause
renderer.pause();

// Manually resume
renderer.resume();

// Complete stop and cleanup
renderer.stop();
```

### Performance Optimization Tips

1. **Reduce particle count on mobile:**
   ```javascript
   const isMobile = window.innerWidth < 768;
   PrismRenderer.CONFIG.particleCount = isMobile ? 40 : 80;
   ```

2. **Disable expensive effects on low-end devices:**
   ```javascript
   // Detect hardware tier (simplified example)
   const isLowEnd = navigator.hardwareConcurrency <= 4;
   if (isLowEnd) {
     PrismRenderer.CONFIG.enableConnections = false;
     GlassEffect.CONFIG.enableParallax = false;
   }
   ```

3. **Lazy load effects:**
   ```javascript
   // Wait for page fully loaded
   window.addEventListener('load', () => {
     const renderer = new PrismRenderer('prism-canvas');
     renderer.start();
   });
   ```

---

## Browser Support

### Modern Browser Support

| Browser | Version | Support Level | Notes |
|---------|---------|---------------|-------|
| Chrome | 76+ | ✅ Full | All features supported |
| Edge | 79+ | ✅ Full | Chromium-based, full support |
| Safari | 9+ | ✅ Full | Requires -webkit- prefix for backdrop-filter |
| Firefox | 103+ | ✅ Full | Backdrop-filter enabled by default |
| Firefox | 70-102 | ⚠️ Partial | Requires `layout.css.backdrop-filter.enabled` flag |

### Mobile Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Safari iOS | ✅ Full | Excellent performance |
| Chrome Android | ✅ Full | Full feature support |
| Samsung Internet | ✅ Full | Based on Chromium |
| Firefox Android | ✅ Full | Version 103+ |

### Fallback Behavior

**No backdrop-filter support (older browsers):**

1. Glassmorphism automatically falls back to:
   - Semi-transparent solid backgrounds
   - Subtle gradient overlay for depth
   - All interactive effects still functional

2. Fallback is applied automatically by `glassEffect.js`:
   ```javascript
   if (!this.supportsBackdropFilter) {
     this.applyFallbackStyles();
   }
   ```

**No Canvas support (very old browsers):**

1. Prism renderer gracefully fails:
   ```javascript
   if (!canvas.getContext) {
     console.warn('Canvas not supported');
     return; // Fail silently
   }
   ```

2. Landing page displays with static gradient background from CSS

### Safari-Specific Notes

**backdrop-filter implementation:**

Safari requires the `-webkit-` vendor prefix:

```css
.glass-card {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Required for Safari */
}
```

This is handled automatically in the code.

**Performance:**

Safari has excellent backdrop-filter performance. No special optimizations needed.

### Firefox-Specific Notes

**Enable backdrop-filter (Firefox 70-102):**

For users on older Firefox versions, they need to enable the feature:

1. Navigate to `about:config`
2. Set `layout.css.backdrop-filter.enabled` to `true`

**Automatic fallback:**

If disabled, the fallback is automatically applied. No user action required for basic functionality.

**Firefox 103+:**

Backdrop-filter is enabled by default. Full support with no configuration.

---

## Authentication Integration

### Storage Keys

The landing page uses localStorage for state management. Update these keys to match your authentication implementation:

**Defined in landing.html:**

```javascript
// Authentication storage key
const AUTH_STORAGE_KEY = 'agri_advisory_auth_token';

// Theme preference storage key  
const THEME_STORAGE_KEY = 'agri_advisory_theme_preference';
```

### Authentication Flow

**Current Implementation:**

```javascript
// On page load, check if user is authenticated
const authToken = localStorage.getItem(AUTH_STORAGE_KEY);
if (authToken) {
  // User is authenticated, redirect to main app
  window.location.href = '/';
  return;
}

// Handle "Get Started" button click
document.getElementById('enter-app').addEventListener('click', (e) => {
  e.preventDefault();
  // Navigate to main app (or login page)
  window.location.href = '/';
});
```

### Integrating with Your Auth System

**Option 1: JWT Token Storage**

```javascript
// After successful login elsewhere in your app:
localStorage.setItem('agri_advisory_auth_token', jwtToken);

// Landing page will detect this and redirect automatically
```

**Option 2: Session-based Auth**

```javascript
// Check session via API call
async function checkAuth() {
  try {
    const response = await fetch('/api/auth/session');
    if (response.ok) {
      window.location.href = '/';
    }
  } catch (error) {
    // User not authenticated, show landing page
  }
}

checkAuth();
```

**Option 3: OAuth/Social Login**

```javascript
// Redirect to OAuth provider
document.getElementById('enter-app').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/auth/google'; // Or your OAuth endpoint
});
```

### Navigation Flow

**Recommended User Journey:**

```
Landing Page (landing.html)
    ↓
    ↓ [Get Started clicked]
    ↓
Login/Signup Page (if not authenticated)
    ↓
    ↓ [Successful auth]
    ↓
Main App Dashboard (/)
    ↓
    ↓ [Sets AUTH_STORAGE_KEY]
    ↓
Future visits to landing.html → Auto-redirect to /
```

### Custom Redirect Logic

**Modify landing.html to customize redirects:**

```javascript
// Redirect based on user role
const authToken = localStorage.getItem(AUTH_STORAGE_KEY);
const userRole = localStorage.getItem('user_role');

if (authToken) {
  if (userRole === 'admin') {
    window.location.href = '/admin';
  } else if (userRole === 'farmer') {
    window.location.href = '/dashboard';
  } else {
    window.location.href = '/';
  }
  return;
}
```

---

## Build & Deployment

### Font Loading Strategy

**Inter Font Preload:**

The landing page preloads the Inter font family for optimal performance:

```html
<!-- In landing.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Why Inter?**

- Clean, modern sans-serif perfect for landing pages
- Excellent legibility at all sizes
- Wide character support including icons
- Optimized for web with variable font options

**Performance Strategy:**

1. **Preconnect:** Establishes early connection to Google Fonts
2. **display=swap:** Ensures text remains visible during font load
3. **Selective weights:** Only loads needed font weights (300-700)

**Alternative: Self-host fonts**

For better performance and privacy, consider self-hosting:

```bash
# Download Inter from https://rsms.me/inter/
# Place in public/fonts/

# Update landing.html
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-display: swap;
  }
</style>
```

### Landing Page with React Dashboard

**Coexistence Strategy:**

The landing page exists alongside the React dashboard application:

```
/landing.html         → Landing page (static HTML)
/                     → React dashboard (index.html via Vite)
/dashboard            → React routes
/crop-advisory        → React routes
/credit-insurance     → React routes
... etc
```

**Build Output:**

```bash
npm run build

# Produces:
dist/
├── landing.html              # Landing page
├── index.html                # React app entry
├── assets/
│   ├── index-[hash].js       # React bundle
│   ├── index-[hash].css      # React styles
│   └── ...
└── public/
    └── js/
        ├── prismRenderer.js  # Landing page scripts
        ├── glassEffect.js
        └── landing-theme.js
```

**Serving Strategy:**

**Development (Vite):**
```bash
npm run dev

# Available at:
# http://localhost:5173/landing.html  ← Landing page
# http://localhost:5173/              ← React dashboard
```

**Production:**

1. **Static hosting (Netlify, Vercel, etc.):**
   - Upload entire `dist` folder
   - Configure redirects to serve React routes

2. **Express server:**
   ```javascript
   // server.js
   app.use(express.static('dist'));
   
   // Serve landing page at root
   app.get('/landing', (req, res) => {
     res.sendFile(path.join(__dirname, 'dist/landing.html'));
   });
   
   // Serve React app for all other routes
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'dist/index.html'));
   });
   ```

### Deployment Checklist

- [ ] Update `AUTH_STORAGE_KEY` to match your auth implementation
- [ ] Customize colors and branding in `landing.html`
- [ ] Test on target browsers (especially Safari and Firefox)
- [ ] Verify mobile performance and responsiveness
- [ ] Check font loading performance (consider self-hosting)
- [ ] Test authentication redirect flow
- [ ] Verify theme persistence across page loads
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Validate analytics/tracking integration
- [ ] Configure proper cache headers for static assets

### Production Optimization

**1. Minify JavaScript:**

The JS files in `public/js/` should be minified for production:

```bash
# Using terser
npx terser public/js/prismRenderer.js -o public/js/prismRenderer.min.js
npx terser public/js/glassEffect.js -o public/js/glassEffect.min.js
npx terser public/js/landing-theme.js -o public/js/landing-theme.min.js

# Update script tags in landing.html
<script type="module" src="/public/js/prismRenderer.min.js"></script>
```

**2. Optimize Assets:**

```bash
# Optimize images
npx @squoosh/cli public/*.png --webp

# Inline critical CSS (optional)
# Extract above-the-fold CSS and inline in <head>
```

**3. Cache Headers:**

Configure your server to cache static assets:

```
# Example .htaccess
<FilesMatch "\.(js|css|woff2|svg)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

**4. CDN Configuration:**

Upload static assets to CDN and update URLs:

```html
<!-- Update in landing.html -->
<script type="module" src="https://cdn.example.com/js/prismRenderer.js"></script>
```

---

## Troubleshooting

### Common Issues

**1. Particles not visible:**
- Check browser console for Canvas errors
- Verify `prismRenderer.js` is loading correctly
- Ensure canvas element has proper dimensions

**2. Glass effect not working:**
- Check if `backdrop-filter` is supported in browser
- Verify fallback styles are applied in older browsers
- Inspect computed styles for `.glass-card`

**3. Theme not persisting:**
- Check localStorage is enabled
- Verify `THEME_STORAGE_KEY` is consistent
- Clear localStorage and test fresh

**4. Performance issues:**
- Reduce `particleCount` (try 40-60)
- Disable `enableConnections`
- Disable `enableParallax`
- Check for console errors

**5. Auth redirect not working:**
- Verify `AUTH_STORAGE_KEY` matches your auth system
- Check browser console for errors
- Test localStorage access (not blocked)

### Debug Mode

Enable debug logging by adding to `landing.html`:

```javascript
// Add after imports
window.LANDING_DEBUG = true;

// In prismRenderer.js and glassEffect.js, add:
if (window.LANDING_DEBUG) {
  console.log('Renderer initialized', config);
}
```

---

## Future Enhancements

Potential improvements for the landing page:

- [ ] Add WebGL-based 3D prism effects
- [ ] Implement scroll-based animations
- [ ] Add hero video background option
- [ ] Create multiple landing page templates
- [ ] Add A/B testing capabilities
- [ ] Integrate analytics tracking
- [ ] Add email capture form
- [ ] Implement cookie consent banner
- [ ] Add multilingual support
- [ ] Create admin panel for live customization

---

## Support

For questions or issues related to the landing page:

1. Check this documentation first
2. Review inline comments in source files
3. Test in multiple browsers
4. Check browser console for errors
5. Refer to performance optimization tips

## License

MIT - Same as main AgriAdvisory platform
