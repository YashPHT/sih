import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sprout } from 'lucide-react'
import { DashboardLayout } from './components/layout'
import { defaultNavigation } from './config/navigation'
import Dashboard from './pages/Dashboard'
import StakeholderDashboards from './pages/StakeholderDashboards'
import CropAdvisory from './pages/CropAdvisory'
import CreditInsurance from './pages/CreditInsurance'
import Marketplace from './pages/Marketplace'
import Traceability from './pages/Traceability'
import PolicymakerDashboard from './pages/PolicymakerDashboard'

const dashboardConfig = {
  appName: 'AgriAdvisory',
  logo: <Sprout className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
  navigation: defaultNavigation,
  showTopbar: true,
  showSidebar: false
}

function App() {
  return (
    <Router>
      <DashboardLayout config={dashboardConfig}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/stakeholders" element={<StakeholderDashboards />} />
          <Route path="/crop-advisory" element={<CropAdvisory />} />
          <Route path="/credit-insurance" element={<CreditInsurance />} />
          <Route path="/traceability" element={<Traceability />} />
          <Route path="/dashboard/policymaker" element={<PolicymakerDashboard />} />
        </Routes>
      </DashboardLayout>
    </Router>
  )
}

export default App
