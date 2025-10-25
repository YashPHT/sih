# 🚀 Render Deployment Guide - AgriAdvisory Platform

Complete guide to deploy the AgriAdvisory Platform on Render with a live public URL.

---

## 📋 Table of Contents

1. [Prerequisites Check](#prerequisites-check)
2. [Quick Deploy (Recommended)](#quick-deploy-recommended)
3. [Manual Configuration](#manual-configuration)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Troubleshooting](#troubleshooting)
7. [Performance Tips](#performance-tips)
8. [For SIH Judges](#for-sih-judges)

---

## ✅ Prerequisites Check

Before deploying, verify locally:

```bash
# Install dependencies
npm install

# Run type check
npm run type-check

# Build for production
npm run build

# Test production build locally
npm run start
# Visit http://localhost:3000
```

**Checklist:**
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] All features work in production build
- [ ] Dark mode working
- [ ] Maps load correctly
- [ ] Blockchain verification working
- [ ] All dashboards display properly
- [ ] Weather data loads (mock or live)

---

## 🎯 Quick Deploy (Recommended)

### Option A: Deploy from GitHub (Blueprint)

**This is the fastest method - uses the included `render.yaml` configuration.**

#### Step 1: Push to GitHub

```bash
# Ensure you're on the correct branch
git status

# Add all files
git add .

# Commit changes
git commit -m "Ready for Render deployment"

# Push to GitHub
git push origin main
```

#### Step 2: Deploy on Render

1. **Go to:** [https://render.com](https://render.com)
2. **Sign up/Login** with GitHub
3. **Click:** "New +" → "Blueprint"
4. **Connect** your GitHub repository
5. Render will detect `render.yaml` and configure automatically
6. **Review settings** (all pre-configured)
7. **Click "Apply"** to start deployment

#### Step 3: Wait for Build

- First deployment: 5-10 minutes
- Subsequent deploys: 3-5 minutes
- You can monitor logs in real-time

#### Step 4: Access Your App

Your app will be live at:
```
https://agri-advisory-platform.onrender.com
```
(or similar - Render will show you the exact URL)

---

### Option B: Manual Dashboard Configuration

If you prefer manual setup:

#### Step 1: Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

#### Step 2: Configure Service

**Basic Settings:**
- **Name:** `agri-advisory-platform` (or your choice)
- **Region:** Singapore (closest to India)
- **Branch:** `main`
- **Root Directory:** (leave empty)
- **Runtime:** Node

**Build & Deploy:**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start`

**Plan:**
- Select **Free** tier

#### Step 3: Environment Variables

Click "Advanced" → "Add Environment Variable":

| Key | Value | Required |
|-----|-------|----------|
| `NODE_ENV` | `production` | Yes |
| `OPENWEATHER_API_KEY` | `your_key_here` | No (optional) |

> **Note:** Weather API key is optional. The app will use mock weather data if not provided.

#### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Visit your app URL

---

## 🔧 Environment Variables

### Required Variables

**NODE_ENV**
- Value: `production`
- Purpose: Enables production optimizations

### Optional Variables

**OPENWEATHER_API_KEY**
- Purpose: Fetch live weather data
- Without it: App uses high-quality mock weather data
- Get key: [OpenWeatherMap API](https://openweathermap.org/api)
- Free tier: 1000 calls/day

---

## ✅ Post-Deployment Verification

Once deployed, test these features:

### 1. Basic Functionality
- [ ] Landing page loads (< 5 seconds)
- [ ] Navigation works
- [ ] No 404 errors
- [ ] No console errors

### 2. Dashboard Features
Test all 5 stakeholder dashboards:
- [ ] Farmer Dashboard
- [ ] Trader/Buyer Dashboard
- [ ] Processor Dashboard
- [ ] Logistics Provider Dashboard
- [ ] Policymaker Dashboard

### 3. Core Modules
- [ ] **Crop Advisory:** AI recommendations loading
- [ ] **Credit & Insurance:** Eligibility assessment working
- [ ] **Marketplace:** Products displaying with filters
- [ ] **Traceability:** QR codes generating, blockchain verification working
- [ ] **Logistics Map:** Interactive map loading with all markers

### 4. Visual & UX
- [ ] Dark mode toggle working
- [ ] Responsive on mobile
- [ ] Charts rendering (Recharts)
- [ ] Icons displaying (Lucide)
- [ ] All images loading

### 5. Advanced Features
- [ ] Weather widget showing data
- [ ] Multilingual support working
- [ ] Variable loading animations
- [ ] Dynamic recommendations

---

## 🔍 Troubleshooting

### Issue 1: Build Fails

**Error:** `npm ERR! code ELIFECYCLE`

**Solution:**
```bash
# Test locally first
rm -rf node_modules package-lock.json
npm install
npm run build
```

If local build works but Render fails, check:
- Node version compatibility
- Memory limits (free tier: 512MB)

---

### Issue 2: TypeScript Errors

**Error:** `TS2307: Cannot find module...`

**Solution:**
Ensure all `@types` packages are in `dependencies` (not `devDependencies`) for Render:

```json
{
  "dependencies": {
    "@types/leaflet": "^1.9.21",
    "@types/qrcode.react": "^1.0.5"
  }
}
```

---

### Issue 3: Static Files Not Found

**Error:** `404` on routes like `/dashboard`

**Solution:**
The `serve` package in `package.json` handles SPA routing. Ensure:
```json
"start": "serve -s dist -l 3000"
```

The `-s` flag enables SPA mode (redirects all routes to `index.html`).

---

### Issue 4: Map Not Loading

**Error:** Leaflet tiles not appearing

**Solution:**
Ensure Leaflet CSS is imported in your build. Check `index.html` or main CSS includes:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

---

### Issue 5: Environment Variables Not Working

**Error:** Weather API calls failing

**Solution:**
For Vite apps, environment variables must be prefixed with `VITE_` to be accessible in browser code.

If you're using server-side middleware (like `weatherRoutes.ts`), it can access regular env vars.

---

### Issue 6: Cold Start Delays

**Symptom:** First request takes 30-60 seconds

**This is normal for Render free tier:**
- Services sleep after 15 minutes of inactivity
- First request wakes the service (cold start)
- Subsequent requests are fast

**For demos:**
- Visit your URL 5 minutes before presenting
- Keep a tab open during presentation
- Refresh periodically to keep service warm

---

## ⚡ Performance Tips

### Reduce Bundle Size

Check your production bundle:
```bash
npm run build
```

Look for large dependencies in the output. Consider:
- Code splitting
- Lazy loading routes
- Tree shaking unused code

### Optimize Images

All images should be optimized:
```bash
# Use WebP format
# Compress images
# Use appropriate sizes
```

### Vite Configuration

Update `vite.config.ts` for production:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'map-vendor': ['leaflet', 'react-leaflet']
        }
      }
    }
  }
})
```

---

## 📊 Render Free Tier Limits

**Aware of:**
- **RAM:** 512 MB
- **CPU:** Shared
- **Bandwidth:** 100 GB/month
- **Build Time:** 15 minutes max
- **Sleep:** After 15 min inactivity
- **Cold Start:** 30-60 seconds
- **Storage:** No persistent file storage

**For SIH Demo:**
- ✅ Perfect for demo purposes
- ✅ No database needed (using mock data)
- ✅ Cold starts acceptable (keep service warm)
- ✅ Sufficient bandwidth for judges

---

## 🎓 For SIH Judges

### Live Demo URL

Once deployed, your URL will be:
```
https://agri-advisory-platform.onrender.com
```
(or custom URL assigned by Render)

### Demo Access

**No login required** - all features accessible directly:

1. **Landing Page:** Overview of platform features
2. **Dashboard:** Main farmer view with AI insights
3. **5 Stakeholder Dashboards:** Different perspectives
4. **Crop Advisory:** AI recommendations with dynamic filters
5. **Credit & Insurance:** Eligibility assessment
6. **Marketplace:** Product listings with search
7. **Traceability:** Blockchain verification with QR codes
8. **Logistics Map:** Interactive supply chain visualization

### Key Features to Highlight

**AI & Machine Learning:**
- Price forecasting (LSTM model)
- Crop recommendations (XGBoost)
- Pest prediction (CNN-based)
- Credit scoring (ML-based assessment)

**Blockchain:**
- SHA-256 hash chain
- Immutable event logging
- QR code generation
- Cryptographic verification
- Integrity detection

**Real-time Logistics:**
- Interactive geospatial map
- Warehouse capacity tracking
- Transport route monitoring
- Status indicators

**User Experience:**
- Dark mode support
- Multilingual (English, Hindi, Punjabi, Telugu, Tamil)
- Responsive design
- Variable loading states
- Accessible UI

### Technology Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Maps:** Leaflet
- **Charts:** Recharts
- **Blockchain:** SHA-256 hashing
- **Deployment:** Render (Node.js)

---

## 📝 Deployment Checklist

Use this before presenting:

### Pre-Demo (1 day before)
- [ ] Deploy to Render
- [ ] Verify deployment successful
- [ ] Test all features on production URL
- [ ] Share URL with team members
- [ ] Document any issues
- [ ] Prepare fallback (local demo)

### Demo Day (30 min before)
- [ ] Visit production URL (wake service from sleep)
- [ ] Test each major feature once
- [ ] Keep browser tab open
- [ ] Check for any console errors
- [ ] Verify dark mode working
- [ ] Test on mobile if needed

### During Demo
- [ ] Have local backup running (just in case)
- [ ] Explain cold start if judges access directly
- [ ] Highlight Render free tier capabilities
- [ ] Mention scalability (can upgrade plan)

---

## 🎯 Success Metrics

**You're ready when:**

✅ Public URL accessible worldwide  
✅ All pages load in < 5 seconds (after cold start)  
✅ No 404 or 500 errors  
✅ All data displays correctly  
✅ AI features demonstrable  
✅ Blockchain verification working  
✅ Maps interactive and responsive  
✅ Dark mode functional  
✅ Mobile responsive  
✅ Professional appearance  
✅ No placeholder or Lorem Ipsum text  

---

## 📞 Support Resources

### Render Documentation
- [Render Docs](https://render.com/docs)
- [Node.js on Render](https://render.com/docs/deploy-node-express-app)
- [Static Sites](https://render.com/docs/static-sites)

### Debugging
- **Logs:** Available in Render Dashboard → Logs tab
- **Shell:** Available in Render Dashboard → Shell tab
- **Metrics:** Monitor CPU/Memory usage

### Community
- [Render Community](https://community.render.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/render)

---

## 🔄 Continuous Deployment

With `render.yaml` and auto-deploy enabled:

1. Push changes to GitHub
2. Render automatically detects push
3. Runs build
4. Deploys if successful
5. New version live in 3-5 minutes

**No manual steps needed!**

---

## 🎉 Congratulations!

Your AgriAdvisory Platform is now live and ready for SIH evaluation!

**Next Steps:**
1. Share the URL with your team
2. Update README.md with deployment URL
3. Prepare demo script
4. Test all features one final time
5. Get ready to present! 🚀

---

## 📄 Additional Configuration Files

### Created Files:
- ✅ `render.yaml` - Render Blueprint configuration
- ✅ `.env.example` - Environment variable template
- ✅ Updated `package.json` - Added production scripts

### No Changes Needed:
- ✅ `.gitignore` - Already configured correctly
- ✅ `vite.config.ts` - Works for production
- ✅ `tsconfig.json` - Proper TypeScript config

---

## 🔐 Security Notes

**Public Deployment:**
- No authentication required (demo purpose)
- All data is mock/simulated
- No sensitive information exposed
- API keys secured via environment variables

**For Production:**
- Add authentication layer
- Implement rate limiting
- Set up database (PostgreSQL/MongoDB)
- Enable CORS restrictions
- Add input validation
- Implement logging & monitoring

---

**Good luck with your SIH submission! 🏆**
