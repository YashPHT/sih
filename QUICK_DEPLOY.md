# 🚀 Quick Deploy Guide

**Get your AgriAdvisory Platform live in 10 minutes!**

---

## ✅ Pre-Flight Check

```bash
# Test build locally
npm install
npm run build
npm run start
# Visit http://localhost:3000
```

All working? Let's deploy! 🎯

---

## 🚀 Deploy to Render (5 Steps)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Sign Up on Render

Go to: [https://render.com](https://render.com)

Sign up with GitHub (free account)

### Step 3: Create New Web Service

1. Click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository
3. Render will detect `render.yaml`
4. Review settings (all pre-configured!)
5. Click **"Apply"**

### Step 4: Wait for Build

⏱️ First build: 5-10 minutes

Watch the logs in real-time. You'll see:
- Installing dependencies
- Running TypeScript compilation
- Building with Vite
- Service starting

### Step 5: Access Your App

🎉 Your app is live!

URL will be: `https://agri-advisory-platform.onrender.com`

(or similar - Render shows exact URL in dashboard)

---

## 🎯 That's It!

**Your platform is now:**
- ✅ Live on the internet
- ✅ Accessible worldwide
- ✅ Ready for SIH judges
- ✅ Auto-deploys on new commits

---

## 🔧 Optional: Add Weather API Key

For live weather data (optional):

1. Get free API key: [OpenWeatherMap](https://openweathermap.org/api)
2. In Render Dashboard → Your Service → Environment
3. Add: `OPENWEATHER_API_KEY = your_key_here`
4. Service will auto-restart

**Note:** Weather works without API key (uses high-quality mock data)

---

## 📱 Test Your Deployment

Visit your URL and check:

- [ ] Landing page loads
- [ ] All dashboards accessible
- [ ] Maps interactive
- [ ] Charts rendering
- [ ] Dark mode working
- [ ] Mobile responsive

---

## ❄️ Cold Starts (Free Tier)

**What:** Service sleeps after 15 min of inactivity

**Effect:** First visit takes 30-60 seconds to wake up

**For Demos:** Visit URL 5 minutes before presenting

---

## 📚 Full Documentation

- **Detailed Guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Checklist:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Weather API:** [WEATHER_API_PRODUCTION.md](./WEATHER_API_PRODUCTION.md)

---

## 🆘 Quick Troubleshooting

### Build Failed?

```bash
# Test locally first
rm -rf node_modules dist
npm install
npm run build
```

If local build works, check Render logs for specific error.

### 404 on Routes?

This shouldn't happen - `serve -s` handles SPA routing.

Check that `package.json` has:
```json
"start": "serve -s dist -l 3000"
```

### Map Not Loading?

Check browser console for errors. Ensure Leaflet CSS is loaded.

---

## 🎓 For SIH Judges

**Demo URL:** `https://your-app.onrender.com`

**Features to Highlight:**
- 5 stakeholder dashboards
- AI-powered crop advisory
- Blockchain traceability
- Interactive logistics map
- Real-time insights

**Tech Stack:**
- React 18 + TypeScript
- Vite build system
- Tailwind CSS
- Leaflet maps
- Deployed on Render

---

## 🔄 Continuous Deployment

**Enabled by default!**

Every `git push` to `main` → Auto-deploys to Render

No manual steps needed.

---

## 💡 Pro Tips

1. **Keep Service Warm:** Visit URL periodically during demo day
2. **Test Mobile:** SIH judges may access on phones
3. **Dark Mode:** Show off the toggle during presentation
4. **Bookmark URL:** Add to all team members' browsers
5. **Screenshot:** Take shots of key features as backup

---

## 🎉 Success!

Your AgriAdvisory Platform is live and ready for evaluation!

**Next Steps:**
1. ✅ Share URL with team
2. ✅ Test all features
3. ✅ Prepare demo script
4. ✅ Update submission with URL
5. ✅ Get ready to win! 🏆

---

**Deployment URL:** _____________________________ (fill this in)

**Deployed Date:** _____________________________ (fill this in)

**Team:** _____________________________ (your team name)

---

Good luck with SIH! 🚀
