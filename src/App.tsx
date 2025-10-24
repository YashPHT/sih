import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Sprout, TrendingUp, Home } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import CropAdvisory from './pages/CropAdvisory'
import CreditInsurance from './pages/CreditInsurance'

function Navigation() {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Sprout className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">AgriAdvisory</span>
          </div>
          <div className="flex space-x-4 items-center">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/crop-advisory"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/crop-advisory') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Sprout className="h-4 w-4 mr-2" />
              Crop Advisory
            </Link>
            <Link
              to="/credit-insurance"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/credit-insurance') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Credit & Insurance
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crop-advisory" element={<CropAdvisory />} />
            <Route path="/credit-insurance" element={<CreditInsurance />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
