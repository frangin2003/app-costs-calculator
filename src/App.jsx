import { useState } from 'react'
import Costs from './components/Costs'
import Dashboard from './components/Dashboard'
import SubscriptionPlansBuilder from './components/SubscriptionPlansBuilder'
import Tabs from './components/Tabs'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'costs':
        return <Costs />
      case 'plans':
        return <SubscriptionPlansBuilder />
      case 'tokens':
        return <div className="flex justify-center">Token Visualisation Coming Soon</div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-full max-w-6xl mx-auto py-8">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-8 flex justify-center">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default App
