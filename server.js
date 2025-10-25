/**
 * Optional Express server for production deployment with API support
 * 
 * This server serves the static build files AND provides the weather API endpoint.
 * 
 * To use this instead of the default static server:
 * 1. Update package.json:
 *    "start": "node server.js"
 * 2. Add express to dependencies:
 *    npm install express
 * 3. Redeploy
 * 
 * The default setup uses 'serve' package (simpler, works for demo with mock data).
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Weather API mock/fallback data
const createMockWeatherResponse = () => ({
  location: 'Demo Farm Location, India',
  source: 'mock',
  lastUpdated: new Date().toISOString(),
  current: {
    temperature: 28,
    feelsLike: 30,
    humidity: 65,
    windSpeed: 12,
    precipitationChance: 20,
    description: 'Partly cloudy',
    icon: '02d'
  },
  forecast: [
    {
      timestamp: new Date(Date.now() + 3 * 3600000).toISOString(),
      temperature: 30,
      precipitationChance: 15,
      windSpeed: 10,
      description: 'Clear sky',
      icon: '01d'
    },
    {
      timestamp: new Date(Date.now() + 6 * 3600000).toISOString(),
      temperature: 32,
      precipitationChance: 10,
      windSpeed: 8,
      description: 'Clear sky',
      icon: '01d'
    }
  ],
  alerts: []
});

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    // If no API key, return mock data
    if (!apiKey) {
      console.log('No OPENWEATHER_API_KEY found, returning mock data');
      return res.json(createMockWeatherResponse());
    }

    // Fetch from OpenWeatherMap (simplified version)
    const params = new URLSearchParams({
      lat: lat || '28.7',
      lon: lon || '77.1',
      units: 'metric',
      appid: apiKey
    });

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${params.toString()}`
    );

    if (!response.ok) {
      console.warn('Weather API failed, returning mock data');
      return res.json(createMockWeatherResponse());
    }

    const data = await response.json();

    // Normalize response
    const weatherResponse = {
      location: `${data.name}, ${data.sys.country}`,
      source: 'live',
      lastUpdated: new Date().toISOString(),
      current: {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        precipitationChance: 0,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      },
      forecast: [],
      alerts: []
    };

    res.json(weatherResponse);
  } catch (error) {
    console.error('Weather API error:', error);
    res.json(createMockWeatherResponse());
  }
});

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 Weather API endpoint: /api/weather`);
  console.log(
    `🌤️  Weather mode: ${
      process.env.OPENWEATHER_API_KEY ? 'Live (OpenWeatherMap)' : 'Mock data'
    }`
  );
});
