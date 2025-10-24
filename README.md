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

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React

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

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Main page components
│   ├── Dashboard.tsx
│   ├── CropAdvisory.tsx
│   └── CreditInsurance.tsx
├── types/           # TypeScript type definitions
├── data/            # Mock data for demo
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles
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

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Demo Data

The application uses mock data to demonstrate functionality. In production, this would be replaced with real API calls to:
- Weather services
- Soil analysis systems
- Market price databases
- Credit scoring engines
- Insurance providers

## License

MIT
