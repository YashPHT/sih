# 📋 Deployment Checklist

Quick reference checklist for deploying AgriAdvisory Platform to Render.

---

## ✅ Pre-Deployment

### Local Testing
- [ ] `npm install` - Dependencies installed
- [ ] `npm run dev` - Development server works
- [ ] `npm run type-check` - No TypeScript errors
- [ ] `npm run lint` - No linting errors
- [ ] `npm run build` - Production build succeeds
- [ ] `npm run start` - Production server works locally

### Features Verification
- [ ] All 5 stakeholder dashboards working
- [ ] Crop Advisory module functional
- [ ] Credit & Insurance assessment working
- [ ] Marketplace displaying products
- [ ] Traceability & QR codes generating
- [ ] Logistics map loading with markers
- [ ] Weather data displaying (mock or live)
- [ ] Dark mode toggle working
- [ ] Charts rendering (Recharts)
- [ ] Mobile responsive

### Code Quality
- [ ] No console.log statements in production code
- [ ] No TODO or FIXME comments critical for deployment
- [ ] No hardcoded localhost URLs
- [ ] All images optimized
- [ ] No Lorem Ipsum placeholder text
- [ ] Professional branding consistent

---

## 🚀 Deployment Steps

### 1. Git Repository
- [ ] Code committed to git
- [ ] Pushed to GitHub (or GitLab/Bitbucket)
- [ ] Branch: `main` or `master`
- [ ] Repository accessible (public or connected to Render)

### 2. Render Configuration
- [ ] `render.yaml` file present in root
- [ ] `.env.example` file created
- [ ] `package.json` has `start` script
- [ ] `serve` package in dependencies

### 3. Render Dashboard Setup
- [ ] Logged into [Render.com](https://render.com)
- [ ] Created new Blueprint or Web Service
- [ ] Connected GitHub repository
- [ ] Selected correct branch
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm run start`
- [ ] Region: Singapore (or preferred)
- [ ] Plan: Free

### 4. Environment Variables (Optional)
- [ ] `NODE_ENV` = `production`
- [ ] `OPENWEATHER_API_KEY` = (optional, for live weather)

---

## 🔍 Post-Deployment

### Deployment Success
- [ ] Build completed without errors
- [ ] Service shows "Live" status
- [ ] Public URL generated
- [ ] URL accessible in browser

### Functionality Testing
- [ ] Landing page loads (< 5 seconds after cold start)
- [ ] Navigation working (no 404s)
- [ ] All pages accessible
- [ ] Data displaying correctly
- [ ] No console errors (check browser DevTools)
- [ ] Images and assets loading

### Module Testing
- [ ] Dashboard: Metrics and charts visible
- [ ] Crop Advisory: Recommendations loading
- [ ] Credit & Insurance: Eligibility working
- [ ] Marketplace: Products with filters
- [ ] Traceability: QR codes and verification
- [ ] Logistics Map: Interactive map with markers
- [ ] Weather: Data displaying
- [ ] Dark Mode: Toggle working

### Performance Check
- [ ] Initial load time acceptable
- [ ] Subsequent page loads fast
- [ ] No memory issues
- [ ] Responsive on mobile
- [ ] Works in multiple browsers (Chrome, Firefox, Safari)

---

## 📱 For Demo/Presentation

### 30 Minutes Before
- [ ] Visit deployment URL (wake from cold start)
- [ ] Test each major feature once
- [ ] Keep browser tab open (prevent sleep)
- [ ] Have local backup running
- [ ] Test on mobile device if needed

### During Demo
- [ ] Explain cold start if judges access directly
- [ ] Showcase key features systematically
- [ ] Highlight AI capabilities
- [ ] Demonstrate blockchain verification
- [ ] Show interactive logistics map
- [ ] Toggle dark mode
- [ ] Show mobile responsiveness

### Backup Plan
- [ ] Local server ready: `npm run dev`
- [ ] Screenshots of key features
- [ ] Video recording of functionality

---

## 🐛 Troubleshooting Quick Reference

### Build Fails
```bash
# Clean and rebuild locally
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Service Won't Start
- Check Render logs for errors
- Verify `start` script in package.json
- Ensure `serve` package installed

### 404 on Routes
- Verify `serve -s` flag (SPA mode)
- Check React Router configuration
- Ensure base URL correct

### Map Not Loading
- Check Leaflet CSS included
- Verify network tab for tile requests
- Check for CORS issues

### Cold Start (30-60s delay)
- **This is normal for free tier**
- Keep service warm by visiting regularly
- Consider paid tier for production

---

## 📊 Success Metrics

**Deployment is ready when:**

✅ Public URL accessible worldwide  
✅ All pages load without errors  
✅ All features demonstrable  
✅ No critical console errors  
✅ Mobile responsive  
✅ Professional appearance  
✅ Team tested and verified  

---

## 📝 Final Steps

### Documentation
- [ ] README.md updated with deployment URL
- [ ] DEPLOYMENT_GUIDE.md reviewed
- [ ] Environment variables documented
- [ ] Known issues documented (if any)

### Team Communication
- [ ] Deployment URL shared with team
- [ ] Demo credentials shared (if any)
- [ ] Known limitations communicated
- [ ] Backup plan discussed

### SIH Submission
- [ ] Deployment URL included in submission
- [ ] Screenshots/video prepared
- [ ] Technology stack documented
- [ ] Team contact information ready

---

## 🎉 Congratulations!

If all items are checked, your platform is **deployment-ready**! 🚀

**Deployment URL:** `https://agri-advisory-platform.onrender.com`

**Next:** Present with confidence! Good luck with SIH! 🏆
